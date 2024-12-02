<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSockets Dashboard</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h1 class="text-2xl font-bold mb-6">WebSockets Statistics</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Connection Status -->
                <div class="bg-gray-50 p-4 rounded">
                    <h2 class="text-lg font-semibold mb-2">Connection Status</h2>
                    <div id="connection-status" class="text-green-500 font-bold">
                        Connecting...
                    </div>
                </div>

                <!-- Active Connections -->
                <div class="bg-gray-50 p-4 rounded">
                    <h2 class="text-lg font-semibold mb-2">Active Connections</h2>
                    <div id="active-connections" class="text-2xl font-bold">
                        0
                    </div>
                </div>

                <!-- Peak Connections -->
                <div class="bg-gray-50 p-4 rounded">
                    <h2 class="text-lg font-semibold mb-2">Peak Connections</h2>
                    <div id="peak-connections" class="text-2xl font-bold">
                        0
                    </div>
                </div>

                <!-- WebSocket Messages -->
                <div class="bg-gray-50 p-4 rounded">
                    <h2 class="text-lg font-semibold mb-2">Messages Received</h2>
                    <div id="messages-received" class="text-2xl font-bold">
                        0
                    </div>
                </div>
            </div>

            <!-- Chart -->
            <div class="mt-8">
                <canvas id="connectionsChart"></canvas>
            </div>
        </div>
    </div>

    <script>
        // Initialize Chart.js
        const ctx = document.getElementById('connectionsChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Active Connections',
                    data: [],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // WebSocket Connection
        const wsHost = '{{ config('websockets.dashboard.port') }}' || '6001';
        const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
        const socket = new WebSocket(`${wsProtocol}//${location.hostname}:${wsHost}/app/statistics`);

        socket.onopen = () => {
            document.getElementById('connection-status').textContent = 'Connected';
        };

        socket.onclose = () => {
            document.getElementById('connection-status').textContent = 'Disconnected';
            document.getElementById('connection-status').classList.remove('text-green-500');
            document.getElementById('connection-status').classList.add('text-red-500');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            // Update statistics
            document.getElementById('active-connections').textContent = data.connections_count || 0;
            document.getElementById('peak-connections').textContent = data.peak_connections_count || 0;
            document.getElementById('messages-received').textContent = data.messages_received || 0;

            // Update chart
            const timestamp = new Date().toLocaleTimeString();
            chart.data.labels.push(timestamp);
            chart.data.datasets[0].data.push(data.connections_count);

            // Keep only last 20 data points
            if (chart.data.labels.length > 20) {
                chart.data.labels.shift();
                chart.data.datasets[0].data.shift();
            }

            chart.update();
        };
    </script>
</body>
</html>