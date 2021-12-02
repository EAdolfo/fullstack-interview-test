from django.db import models

class Status:
    OPEN = 'open'
    CLOSED = 'closed'
    MERGED = 'merged'

STATUSES = [
    (Status.OPEN, 'Open'),
    (Status.CLOSED, 'Closed'),
    (Status.MERGED, 'Merged')
]

# Create your models here.
class PullRequest(models.Model):
    title = models.CharField(max_length=100)
    created_date = models.DateTimeField()
    author = models.CharField(max_length=100)
    body = models.TextField(max_length=500)
    state = models.CharField(max_length=20, choices=STATUSES)
    additional_data = models.JSONField(default=dict, blank=True, null=True)


class GitToken(models.Model):
    token = models.CharField(max_length=100)
