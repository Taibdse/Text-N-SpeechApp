$(() => {
  $('#form').submit(speak);
  $('#rate').change(e => {
    let { value } = e.target;
    $('#rateVal').text(value);
  })
  $('#pitch').change(e => {
    let { value } = e.target;
    $('#pitchVal').text(value);
  })
  $('#selectVoice').change(speak);

  getVoices();
  if (synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
  }
  
})

const synth = window.speechSynthesis;
let voices = [];

function getVoices(){
  voices = synth.getVoices();
  console.log(synth);
  let $selectVoices = $('#selectVoice');
  $selectVoices.html('');
  voices.forEach(voice => {
    let { name, lang } = voice;
    $selectVoices.append(`<option valua="${name}">${name} ( ${lang} )</option>`)
  })
}

function speak(e){
  e.preventDefault();
  console.log(123);
  if(synth.speaking){
    console.log('Already Speaking...');
    return;
  }
  let val = $('#txtSpeechText').val();
  if(val.trim() == '') return showAlert();
  showWaveImage();

  const speechText = new SpeechSynthesisUtterance(val);

  speechText.onend = handleOnEnd;

  speechText.onerror = handleOnError;

  const selectedVoice = $('#voice').val();
  voices.forEach(voice => {
    if(selectedVoice == voice.name) speechText.voice = voice;
  })
  let rate = Number($('#rate').val());
  let pitch = Number($('#pitch').val());
  speechText.rate = rate;
  speechText.pitch = pitch;
  synth.speak(speechText);
}

function showAlert(){
  swal({
    title: "No Text to speak",
    text: "You have to type text on the input!",
    icon: "error",
    button: "Aww yiss!",
    timer: 4000
  });
}

function showWaveImage(){
  $('body').css({
    backgroundImage : 'url(custom/images/wave.gif)',
    backgroundRepeat : 'repeat-x',
    backgroundSize : '100% 100%'
  })
}

function handleOnEnd(){
  console.log('Done speaking...');
  $('body').css({
    background : '',
  })
}

function handleOnError(){
  console.log('Something went wrong');
}