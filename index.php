<?php

\Kirby\Cms\App::plugin('johannschopplich/punctuation-section', [
    'sections' => [
        'punctuation' => array_replace_recursive(
            include \Kirby\Cms\Section::$types['info'],
            [
                'props' => [
                    'fieldsets' => fn (array $value = []) => $value
                ]
            ]
        )
    ]
]);
