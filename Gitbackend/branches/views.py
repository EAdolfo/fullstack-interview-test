from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from git import Repo
from rest_framework.response import Response
import os


project_path = os.path.abspath(os.path.join(os.getcwd(), os.pardir))

repo = Repo(project_path)


class BranchesViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['get'], url_path='list')
    def branch_commit_list(self, request):
        heads = [head.name for head in repo.heads]
        return Response({
            'code': 200,
            'data': heads
        })

    @action(detail=False, methods=['get'], url_path='detail')
    def commit_detail(self, request):
        branch_commits = repo.iter_commits(request.query_params.get('branch_name'))
        commits = [{
            'commit_id': commit.hexsha,
            'datetime': commit.committed_datetime,
            'author': commit.author.name,
            'message': commit.message
        } for commit in branch_commits]
        return Response({
            'code': 200,
            'data': commits
        })


class CommitViewSet(viewsets.ViewSet):

    authentication_classes = []
    permission_classes = (AllowAny,)

    @action(detail=False, methods=['get'], url_path='commit-detail')
    def commit_detail(self, request):
        commit_obj = repo.commit(request.query_params.get('commit_id'))

        commit = {
            'datetime': commit_obj.committed_datetime,
            'author': commit_obj.author.name,
            'email': commit_obj.author.email,
            'message': commit_obj.message,
            'files': len(commit_obj.stats.files.items())
        }
        return Response({
            'code': 200,
            'data': commit
        })





