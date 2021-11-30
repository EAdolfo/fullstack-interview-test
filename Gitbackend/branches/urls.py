from rest_framework import routers

from django.urls import path, include

from branches import views

router = routers.DefaultRouter()
router.register(r'branches', views.BranchesViewSet, basename='branches')

urlpatterns = [
    path('', include(router.urls)),
]