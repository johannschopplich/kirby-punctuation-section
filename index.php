<?php

$base = \Kirby\Cms\Section::$types['info'];

if (is_string($base)) {
    $base = include $base;
}

\Kirby\Cms\App::plugin('johannschopplich/punctuation-section', [
    'sections' => [
        'punctuation' => array_replace_recursive($base, [
            'props' => [
                'fieldsets' => fn (array $value = []) => $value
            ]
        ])
    ]
]);
