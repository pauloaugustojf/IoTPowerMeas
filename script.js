var txt = document.querySelector("span.brokerstatus")
var current = document.querySelector("p.current")
txt.innerText = '';
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
const host = 'wss://v30a3511.ala.us-east-1.emqxsl.com:8084/mqtt'
//const host = "wss://broker.emqx.io:8084"
const topicsub = 'testtopic'
const options = {
  username: 'paulo',
  password: '1234',
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  }
txt.innerText = 'Connecting mqtt client'
const client = mqtt.connect(host, options)
client.on('error', (err) => {
txt.innerText = 'Connection error'
client.end()
})
client.on('reconnect', () => {
txt.innerText = 'Reconnecting...'
})
client.on('connect', () => { txt.innerText = "Conectado ao broker EMQX"
//Subscribe 
client.subscribe(topicsub, { qos: 0 }) }) /* Unsubscribe client.unubscribe('testtopic', () => { alert('Unsubscribed'); })*/
client.on("message", (topic, message) => {
  console.log(topic)
  // message is Buffer
  console.log(message.toString())})