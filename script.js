var txt = document.querySelector("span.brokerstatus")
var espstatus = document.querySelector("span.espstatus")
var voltage = document.querySelector("p.voltage")
var current = document.querySelector("p.current")
var va = document.querySelector("p.VA")
var btn = document.querySelector("input.btn")
var topic = document.querySelector("input.topic")
var message = document.querySelector("input.message")
var tensao, corrente
function send() {
  client.publish(topic.value, message.value)
}
btn.addEventListener("click", send, false)
txt.innerText = '';
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
const host = 'wss://m4b00291.ala.eu-central-1.emqxsl.com:8084/mqtt'
//const host = "wss://broker.emqx.io:8084"
const topicsub1 = 'testtopic/tensao'
const topicsub2 = 'testtopic/corrente'
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
txt.innerText = 'Conectando ao Broker ...'
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
client.subscribe(topicsub1, { qos: 0 })
client.subscribe(topicsub2, { qos: 0 }) }) /* Unsubscribe client.unubscribe('testtopic', () => { alert('Unsubscribed'); })*/
client.on("message", (topic, message) => {
  if(topic == topicsub1){
    tensao = message + 0
    voltage.innerText = message.toString() + "V";
    va.innerText = (tensao * corrente).toFixed(2).toString() + "VA"
  }
  if(topic == topicsub2){
    corrente = message + 0
    current.innerText = message.toString() + "A";
    //client.publish('presence', 'bin hier')
    
  }
  
  espstatus.innerText = "ESP-32 Conectado!"
  //console.log(topic)
  // message is Buffer
  //console.log(message.toString())
})