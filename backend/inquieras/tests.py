from django.test import TestCase
from django.urls import reverse


class IndexTests(TestCase):
    def test_index_ok(self):
        response = self.client.get(reverse("inquieras:index"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["app"], "inquieras")
