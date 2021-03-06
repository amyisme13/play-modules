<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>Laravel</title>

  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

  <link rel="stylesheet" href="{{ asset(mix('css/app.css')) }}">
</head>

<body class="font-sans antialiased">
  @vueApp

  <script src="{{ asset(mix('js/manifest.js')) }}"></script>
  <script src="{{ asset(mix('js/vendor.js')) }}"></script>
  <script src="{{ asset(mix('js/app.js')) }}"></script>
</body>

</html>