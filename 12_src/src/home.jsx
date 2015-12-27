import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
// We use the same ES6 import trick to get all action creators and produce a hash like we did with
// our reducers. If you haven't yet, go get a look at our action creator (./actions-creators.js).
import * as actionCreators from './action-creators'

@connect((state/*, props*/) => {
    // This is our select function that will extract from the state the data slice we want to expose
    // through props to our component.
    return {
      reduxState: state,
      frozen: state._time.frozen,
      time: state._time.time
    }
})

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.height =[];
    var uistate=this.props.reduxState.mouseReducer
    if(uistate.activeitem!==0 )
    this.height.push( {
      type: 'ACTIVE_ITEM', id: 0
    })
  }

  onTimeButtonClick () {
    // This button handler will dispatch an action in response to a click event from a user.
    // We use here the dispatch function "automatically" provided by @connect in a prop.
    // There are alternatives way to call actionCreators that are already bound to dispatch and those
    // imply to provide the second parameter to 'connect':
    // https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
    this.props.dispatch(actionCreators.getTime())
  }

  // Check whether current mouse position is within a rectangle
  regionhit ( x,  y,  w,  h){
    var uistate=this.props.reduxState.mouseReducer

    var canvas = ReactDom.findDOMNode(this.refs.canvas);
    if(canvas){
      var context = canvas.getContext("2d");
      var p = context.getImageData(uistate.mousex, uistate.mousey, 1, 1).data;
      var hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
      //console.log(hex);
      if (hex!=="#000000") {
       return false
      }
    }
    if (uistate.mousex < x ||
      uistate.mousey < y ||
      uistate.mousex >= x + w ||
      uistate.mousey >= y + h)
      return false;
      return true;
    }

  rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  componentDidMount(){
    var canvas = ReactDom.findDOMNode(this.refs.canvas);
    if(canvas){
      var context = canvas.getContext("2d");
      // load image from data url
      var imageObj = new Image();
      imageObj.setAttribute('crossOrigin', 'anonymous');
      imageObj.onload = function() {
        context.drawImage(this, 0, 0);
      };
      imageObj.src = "http://127.0.0.1:5984/geoj/dados_img/PNG_transparency_demonstration_1.png";
    }
  }

  componentDidUpdate(){
    if(this.height.length>1)
    {
      this.props.dispatch(this.height[this.height.length-1])
    }
    else {
      if(this.height[0]){
        this.props.dispatch(this.height[0])}
      }
      this.height=[]
  };



  desenhaButao(num,top,left){
    var uistate=this.props.reduxState.mouseReducer;

    if (uistate.activeitem == num){
      if (uistate.mouseup){
          if(uistate.hotitem==num )  {
              alert("click")
          }
          // set notActive
          if(uistate.activeitem!==0 )
           {
             this.height.push( {
                  type: 'ACTIVE_ITEM', id: 0
                })
            }
        }
    }
    else{
      if(uistate.hotitem==num )
          if (uistate.mousedown){
             if(uistate.activeitem!==num )
              this.height.push( {
                     type: 'ACTIVE_ITEM', id: num
                   })
          }
    }
    //if inside
    if (this.regionhit ( left ,  top , 64,  48)){
            if(uistate.activeitem==0 )
              {
                if(uistate.hotitem!==num )
                this.height.push( {
                   type: 'HOT_ITEM', id: num
                 })
               }
            if(uistate.activeitem==num ){
              if(uistate.hotitem!==num )
              this.height.push( {
                 type: 'HOT_ITEM', id: num
               })
            }
    }
    //if outside
    if (!this.regionhit ( left ,  top , 64,  48)){

                  if(uistate.hotitem==num )
                  this.height.push( {
                     type: 'HOT_ITEM', id: 0
                   })
      }

    var cor;

          if (uistate.activeitem == num)
          {
                if (uistate.hotitem == num)
              {
                // Button is merely 'hot'
                  cor="brown"
              }else
                // Button is both 'hot' and 'active'
                  cor="yellow";
          }
        else
        {
              if (uistate.hotitem == num)
            {
              // Button is merely 'hot'
                cor="green"
            }else
          // button is not hot, but it may be active
           cor="blue"
        }

      return(
         <div style={{position: "absolute",
         top: top+"px",
         left: left+"px",
         backgroundColor: cor,
         width: 64+"px",
         height: "48px",
         textAlign: "center"
         }}>{num}</div>)

    return(
      <div style={{position: "absolute",
      top: top+"px",
      left: left+"px",
      backgroundColor: "red",
      width: 64+"px",
      height: "48px",
      textAlign: "center"
      }}>{num}</div>)
    }

    // desenhaCanvas(){
    //   //return <div></div>
    //   return (
    //     <canvas
    //       style={{
    //         position:"absolute",
    //         top:"0",
    //         left:"0",
    //         //transform:"rotate(10deg)"
    //       }}
    //       ref="canvas"
    //       width={600}
    //       height={600}>
    //     </canvas>)
    // }

    desenhaTexto(top,left,text){
        return(
        <div style={{
          position: "absolute",
          top: top+"px",
          left: left+"px",
          backgroundColor:"red"}}>
          <h1>{text.slice(0,16)} </h1>
          <h1>{text.slice(16,75)} </h1>
        </div>
      )
    }

    doOverlap( rect1 , rect2){
      if (rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y < rect2.y + rect2.height &&
       rect1.height + rect1.y > rect2.y) {
        // collision detected!
        return true;
      }
      return false;
    }

  desenhaMenu(){
    var erro= false;
    var {reduxState } = this.props
    var a=reduxState.pagina[0].menu[2]
    var b=reduxState.pagina[0].menu[3]
    var bo=this.doOverlap({y:a.Butao[1],x:a.Butao[2],width: 64,height: 48},
                            {y:b.Butao[1],x:b.Butao[2],width: 64,height: 48})
    //console.log("EEE"+bo);
    if(bo)   return(
        {error: true ,div:this.desenhaTexto(300,200,"Please designers Learn some Math " )}

     )

    var buts=reduxState.pagina[0].menu.map(
      a=> this.desenhaButao(a.Butao[0],a.Butao[1],a.Butao[2])
    )
    return(
      {error: false ,div:<div>{(buts)}</div>}
    )
  }
  desenhaCena(){
  var {error,div}=this.desenhaMenu();

    if(error){
      return(
        <div>
           {div}

         </div>
      )

    }
    else {
  return  (  <div>
{div}

    </div>
    )}
  }


  render () {

    // Thanks to our @connect decorator, we're able to get the data previously selected through the props.
    var { frozen, time, reduxState } = this.props
    var attrs = {}

    if (frozen) {
        attrs = {
          disabled: true
        }
    }


    // desenha particulas

      var tt=reduxState.particReducer.map((p,i)=>{
    //    console.log(p);
    // console.log(p.position.toString() );
    let [x,y] = [p.position[0] , p.position[1]]
    let xi= (((i+3)*2+100)%125)+100
  //  if(xi<100) xi=xi+80
    let mi=  (p.mass*2).toFixed(0)-20
    let zi= (mi*xi+20)%255
    // console.log(mi);

    let cor= "rgb("+mi+","+ xi+","+zi+")";
    //if(i==1) cor="blue"
    let style= {
          position: "absolute",
          WebkitFilter:"blur(0.1em)",
           backgroundBlendMode: "multiply",
        backgroundColor: cor,
        top: ((20+(y-p.mass))).toFixed(1)+"px",
        left: ((20+(x-p.mass))).toFixed(1) +"px",
        width: p.mass+"px",
        height: p.mass+"px"
    }
        return(<div key={i} style={style}>

        </div>); } )

    return (
      <div>
        {tt}
        <h1>Provider and @connect example</h1>
        <span>
          <b>What time is it?</b>
            <br/>
             { time ? `It is currently ` : 'No idea yet...' }
        <br/>
           {time}
        </span>
        <br />
        {/* We register our button handler here and use the experimental ES7 function's binding operator "::"
            to have our handler to be bound to the component's instance. */}
        <button { ...attrs } onClick={::this.onTimeButtonClick}>Get time!</button>
        <pre>
          redux state = { JSON.stringify(reduxState.mouseReducer, null, 2) }
          redux state = { JSON.stringify(reduxState._time, null, 2) }
          redux state = { JSON.stringify(reduxState.pagina, null, 2) }

 { /*  redux state =JSON.stringify(reduxState, null, 2) */}

        </pre>
        {this.desenhaCena()}
      </div>
    )
  }
}

// Go to ./13_final-words.js for our last advice about what to do now...
