from rest_framework import serializers

from .models import PullRequest


class PullRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PullRequest
        fields = (
            'id',
            'title',
            'author',
            'created_date',
            'body',
            'state',
            'head',
            'base'
        )

    head = serializers.SerializerMethodField()
    base = serializers.SerializerMethodField()

    @staticmethod
    def get_head(obj):
        return obj.additional_data.get('head')

    @staticmethod
    def get_base(obj):
        return obj.additional_data.get('base')