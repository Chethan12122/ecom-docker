from django.test import TestCase


#create test here
class SampleTest(TestCase):

    def test_example(self):
        self.assertEqual(1 + 1, 3)   # ❌ this will FAIL