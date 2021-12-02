from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
import requests
import json

from .models import PullRequest, GitToken
from .serializers import PullRequestSerializer

class PullRequestsViewSet(viewsets.ModelViewSet):

    serializer_class = PullRequestSerializer
    queryset = PullRequest.objects.all()

    git_token = GitToken.objects.last()

    headers = {'Accept': 'application/vnd.github.v3+json',
                   'Authorization': 'token %s' % git_token.token}

    url = 'https://api.github.com/repos/{}/{}/'.format('EAdolfo', 'git-project')

    def get_queryset(self):
        self.update_pull_requests()
        return self.queryset.all()

    def create(self, request, *args, **kwargs):
        data = request.data
        if data.get('id'):
            item = self.queryset.filter(id=data.get('id')).first()
            if not item:
                return Response({
                    'code': 404,
                    'message': 'Id not found'
                })
            response = self.create_edit_pull_request(data, 'PATCH', 'pulls/{}'.format(item.additional_data.get('number')))
            if response.status_code == 200:
                item = self.edit_base_object(item, request.data)
                item.save()
            return Response({
                'code': response.status_code
            })

        else:
            if data.get('pull_id'):
                item = self.queryset.filter(id=data.get('pull_id')).first()
                if item:
                    response = self.create_edit_pull_request(request.data, 'PUT', 'pulls/{}/merge'.format(item.additional_data.get('number')))
                    if response.status_code == 200:
                        item = self.edit_base_object(item, request.data)
                        item.save()
                    return Response({
                        'code': response.status_code
                    })
            else:
                response = self.create_edit_pull_request(request.data, 'POST', 'pulls')
                data_response = {
                    'code': response.status_code,
                    'message': response.reason
                }
                if response.status_code == 201:
                    pull_number = json.loads(response.text).get('number')
                    data_response['data'] = self.serializer_class(self.queryset.filter(additional_data__number=pull_number).first()).data
                return Response(data_response)

    def edit_base_object(self, instance, data):
        for key in data:
            if hasattr(instance, key):
                value = data.get(key)
                setattr(instance, key, value)
            else:
                keys = key.split('__')
                if hasattr(instance, keys[0]):
                    previous_data = getattr(instance, keys[0])
                    pd = previous_data
                    for i in range(1, len(keys)-1):
                        try:
                            if not pd.get(keys[i]):
                                pd[keys[i]] = {}
                            pd = pd.get(keys[i])
                        except:
                            pd = pd[int(keys[i])] if pd is list and len(pd) > i else {}
                    value = data.get(key)(data, key)
                    pd[keys[-1]] = value
                    setattr(instance, keys[0], previous_data)
        return instance

    @staticmethod
    def create_edit_pull_request(data, method, api_url):
        url = PullRequestsViewSet.url + api_url
        response = requests.request(method, url, data=json.dumps(data), headers=PullRequestsViewSet.headers)
        PullRequestsViewSet.update_pull_requests()
        return response

    @action(detail=False, methods=['get'], url_path='detail')
    def commits_list(self, request):
        url = PullRequestsViewSet.url+'pulls/{}/commits'.format(request.get('pull_number'))
        pull_request_commits = requests.get(url).json()
        commits = [{
            'commit_id': commit.hexsha,
            'datetime': commit.committed_datetime,
            'author': commit.author.name,
            'message': commit.message
        } for commit in pull_request_commits]
        return Response({
            'code': 200,
            'data': commits
        })

    @staticmethod
    def update_pull_requests():
        url = PullRequestsViewSet.url+'pulls?state=all'
        pull_requests = requests.get(url).json()
        for pull_request in pull_requests:
            if not PullRequest.objects.filter(additional_data__id=pull_request.get('id')).exists():
                state = pull_request.get('state')
                if pull_request.get('merged_at'):
                    state = 'merged'

                PullRequest.objects.create(
                    title=pull_request.get('title'),
                    author=pull_request.get('user').get('login'),
                    created_date=pull_request.get('created_at'),
                    body=pull_request.get('body'),
                    state=state,
                    additional_data={
                        'id': pull_request.get('id'),
                        'number': pull_request.get('number'),
                        'head': pull_request.get('head').get('ref'),
                        'base': pull_request.get('base').get('ref')
                    }
                )
