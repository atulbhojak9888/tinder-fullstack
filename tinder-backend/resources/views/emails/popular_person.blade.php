<!doctype html>
<html><body>
  <h2>Popular Person Alert</h2>
  <p>{{ $person->name }} (ID: {{ $person->id }}) has {{ $person->likes_count }} likes.</p>
  <p>Open admin: {{ config('app.url') }}/admin/people/{{ $person->id }}</p>
</body></html>
