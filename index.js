//set the off button to absolutely off everuthing at any time, also prevent button press when computer is playing
var state={start:false,comp:true,numbers:[]}
var music =['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3','https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3']
class Main extends React.Component {
  constructor(props){
    super(props)
    this.state={
      input:[],
      score:'00',
      strict:false,
      start:false,
      on:false
    }
    this.strict=this.strict.bind(this);
    this.player=this.player.bind(this)
    this.isEqual=this.isEqual.bind(this)
    this.gen_no=this.gen_no.bind(this)
    this.add_no=this.add_no.bind(this)
    this.play=this.play.bind(this)
    this.done=this.done.bind(this)
    this.dine=this.dine.bind(this)
    this.on=this.on.bind(this)
  }
  on(){
    this.setState({start:false,on:!this.state.on,score:'00',strict:false,input:[]})
    state={start:false,comp:true,numbers:[]}
  }
  isEqual(arr,eng){
    let odd=[];
    if(arr.length==eng.length){
      for(let i=0;i<arr.length;i++){
        if(arr[i] == eng[i]){
          odd.push(true)
        }
        else{
          odd.push(false)
        }
      }
    }
    if(odd.every(i=> i==true)){
      return true
    }
    else{return false}
  }
  strict(){
    this.setState({strict:!this.state.strict})
  }
  gen_no(){
    return Math.round(Math.random()*3)+1
  }
  add_no(){
    let kk=this.gen_no()
    state.numbers.push(kk)
    return state.numbers
  }
  play(min){
    if(!min){
      var arr=this.add_no()
    }
    else{
      var arr=state.numbers
    }
    let i=0
    var timer=setInterval(()=>{
      if(i<arr.length){
      let bee=document.getElementById(arr[i])
      bee.classList.add('light')
      new Audio(music[arr[i]-1]).play()
      setTimeout(()=>{
        bee.classList.remove('light')
        },500)
      i++}
      else{
        clearInterval(timer)
      }
    },1000)
    state.comp=false
    return true
  }
  player(e){
    if(!this.state.comp && state.start){
      let b=document.getElementById(e.target.id)
      if(e.type=='mousedown'){
        let nume=this.state.input.concat(Number(e.target.id))
        b.classList.add('light')
        if(this.isEqual(nume,state.numbers.slice(0,nume.length))){
          new Audio(music[Number(e.target.id)-1]).play()
        }
        else{
          new Audio('https://www.soundjay.com/misc/sounds/fail-buzzer-04.mp3').play()
        }
        }
      else{b.classList.remove('light')}
      return true
    }
  }
 
  dine(e){
    if(this.state.on){
      state.start=!state.start
      this.setState({start:!this.state.start,score:'00'})
      if(state.start){this.done(e)}
      else{
        state={start:false,comp:true,numbers:[]}
      } 
    }
  }
  done(e,min){
    if(state.start && this.state.on){
      if(state.comp){
        this.play(min)
      }
      else{
        let num=this.state.input.concat(Number(e.target.id))
        if(num.length==state.numbers.length && this.isEqual(num,state.numbers)){
          this.setState({score:Number(this.state.score)>8 ? ''+(Number(this.state.score)+1) : '0'+(Number(this.state.score)+1) ,input:[]})
          state.comp=true
          //
          if((Number(this.state.score)+1) ==20){
            this.setState({input:[]})
            state.comp=true
            state.numbers=[]
            state.start=false
          }
          else{
            setTimeout(this.done(e),1000)
          }
          
        }
        else if(num.length!=state.numbers.length && this.isEqual(num,state.numbers.slice(0,num.length))){
          this.setState({input:num})
        }
        else if(!this.isEqual(num,state.numbers.slice(0,num.length)) && this.state.strict){
          this.setState({input:[],score:'00'})
          state.numbers=[]
          state.comp=true
          setTimeout(this.done(e),1000)
        }
        else if(!this.isEqual(num,state.numbers.slice(0,num.length)) && !this.state.strict){
          this.setState({input:[]})
          state.comp=true
          setTimeout(this.done(e,true),1000)
        }
      }
    }
  }
  render() {
    return (
      <div className='total'>
      <div className='top'>
      <div id='1' onClick={this.done} onMouseDown={this.player} onMouseUp={this.player} className=' tent tent1' />
      <div id='2' onClick={this.done} onMouseDown={this.player} onMouseUp={this.player} className='tent tent2' />
      </div>
      <div className='bottom'>
      <div id='3' onClick={this.done} onMouseDown={this.player} onMouseUp={this.player} className='tent tent3' />
      <div id='4' onClick={this.done} onMouseDown={this.player} onMouseUp={this.player} className='tent tent4' />
      </div>
      <div className='center'>
      <h1>Simon</h1>
      <div className='sec'><div className='show'> <div style={!this.state.on? {opacity:'0.25'}: {opacity:'1'}}>{state.start && this.state.on? this.state.score : '--' }</div> </div><button onClick={this.dine} className='start'></button><div className='light'><div className='ligh' style={this.state.strict && this.state.on?{backgroundColor:'red'}: {backgroundColor:'black'}} /> <button onClick={this.strict} className='strict'></button></div></div>
      <div className='third'><p>Count</p> <p> start</p> <p> strict</p></div>
      <div className='last'><h3>off</h3><div onClick={this.on} className='change'><div style={this.state.on? {marginLeft:'1.25rem'}: {marginLeft:'0rem'}} className='tip' /></div><h3>on</h3></div>
      </div>
      <div style={this.state.score==20? {display:'grid',placeItems:'center'}: {display:'none'}} className='win'><p id='p'>You Won!</p><button onClick={this.dine} id='but'>Restart</button></div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
