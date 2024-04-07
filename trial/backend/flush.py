from django.core.management.base import BaseCommand
from studentapi.models import Marks

class Command(BaseCommand):
    help = 'Flushes all records from the specified table.'

    def handle(self, *args, **options):
        Marks.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Successfully flushed the table.'))