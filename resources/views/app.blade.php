<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>Laravel</title>

  <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
  <style>
    html {
      overflow-y: scroll;
    }
  </style>

  @vite
</head>

<body class="font-sans antialiased">
  @vueApp
</body>

</html>