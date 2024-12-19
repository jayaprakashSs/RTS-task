// Connect to the MQTT broker
const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt');

// Handle successful connection
client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('test/topic', (err) => {
    if (err) {
      console.error('Failed to subscribe:', err);
    } else {
      console.log('Subscribed to test/topic');
    }
  });
});

// Handle incoming messages
client.on('message', (topic, message) => {
  console.log(`Message received on topic "${topic}": ${message.toString()}`);
});

// Handle connection errors
client.on('error', (err) => {
  console.error('Connection error:', err);
});

// Publish a message to a topic
function publishMessage() {
  const topic = document.getElementById('topic').value || 'test/topic';
  const message = document.getElementById('message').value || 'Hello MQTT';
  
  client.publish(topic, message, (err) => {
    if (err) {
      console.error('Failed to publish message:', err);
    } else {
      console.log(`Message "${message}" published to topic "${topic}"`);
    }
  });
}
