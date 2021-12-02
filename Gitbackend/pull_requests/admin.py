from django.contrib import admin

from .models import PullRequest, GitToken


class PullRequestAdmin(admin.ModelAdmin):
    list_display = ['created_date', 'title', 'body', 'author', 'state']


class GitTokenAdmin(admin.ModelAdmin):
    list_display = ['token']


admin.site.register(PullRequest, PullRequestAdmin)
admin.site.register(GitToken, GitTokenAdmin)