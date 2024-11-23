<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

function generateTrendData($keyword) {
    $data = [];
    $baseValue = rand(30, 70);
    $volatility = rand(5, 15);
    
    for ($i = 30; $i >= 0; $i--) {
        $date = date('Y-m-d', strtotime("-$i days"));
        $value = $baseValue + rand(-$volatility, $volatility);
        $value = max(0, min(100, $value)); // Ensure value stays between 0 and 100
        
        $data[] = [
            'date' => $date,
            'value' => $value,
            'keyword' => $keyword
        ];
    }
    
    return $data;
}

$keywords = isset($_GET['keywords']) ? explode(',', $_GET['keywords']) : [];
$result = [];

foreach ($keywords as $keyword) {
    $result = array_merge($result, generateTrendData(trim($keyword)));
}

echo json_encode($result);