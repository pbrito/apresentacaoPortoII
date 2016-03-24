import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import PIXI from "./pixi.min.js"
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
  //  this.renderer =null
    this.renderer2=null;
    this.stage = new PIXI.Container();
    this.backgroundContainer = null;
    this.backgroundContainerOld = new PIXI.Container();
    this.height =[];
    this.bunnys=[];
    //elementos da animacao em background
    this.tesoura=[];
    //diversas animacoes
    this.animacoes={"wygygyge":1234}
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
    // var canvas = ReactDom.findDOMNode(this.refs.canvas);
    // if(canvas){
    //   var context = canvas.getContext("2d");
    //   //  console.log(canvas);
    //   //  console.log(context);
    //   //   var p = context.getImageData(uistate.mousex, uistate.mousey, 1, 1).data;
    //   //   var hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
    //   //   //console.log(hex);
    //   //   if (hex!=="#000000") {
    //   //    return false
    //   //   }
    // }

    if (uistate.mousex[0].pos < x ||
      uistate.mousey < y ||
      uistate.mousex[0].pos >= x + w ||
      uistate.mousey >= y + h)
      return false;
      return true;
    }

  rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) {return "000";}
    else {  return ((r << 16) | (g << 8) | b).toString(16);}
  }


  desenhaBackground(  ) {
    var zombieTexture;
    //segundos data a b -- Math.floor((b-a)/1000)

    let strTr= (this.props.reduxState.mouseReducer.transicoes.start);
    let difT=(new Date())-strTr
    let actD=Math.floor((difT)/70)

    if (strTr===undefined  ){
      let pgX= this.props.reduxState.mouseReducer.pagina.id;
      if(pgX===undefined) pgX="paginaA";
      let backP=(this.props.reduxState.siteApp[pgX].content[0].background)
      let backCl=(this.props.reduxState.siteApp[pgX].content[0].backgroundColor)
      zombieTexture= PIXI.Texture.fromImage(backP);
      var zombie = new PIXI.Sprite(zombieTexture);
      var back = new PIXI.Graphics();
      back.beginFill( backCl, 1)
      back.drawRect(0,0,900,800)
      zombie.position.x=100;
      zombie.position.y=100;
      this.backgroundContainerOld.addChild(back);
      this.backgroundContainerOld.addChild(zombie);
      this.renderer2.render(this.backgroundContainerOld);

    }
    if (strTr!==undefined && actD == this.props.reduxState.mouseReducer.transicoes.duration ){
      let pgX= this.props.reduxState.mouseReducer.pagina.id;
      let backP=(this.props.reduxState.siteApp[pgX].content[0].background)
      let backCl=(this.props.reduxState.siteApp[pgX].content[0].backgroundColor)
      zombieTexture= PIXI.Texture.fromImage(backP);
      var zombie = new PIXI.Sprite(zombieTexture);
      var back = new PIXI.Graphics();
      back.beginFill( backCl, 1)
      back.drawRect(0,0,900,800)
      zombie.position.x=100;
      zombie.position.y=100;
      this.backgroundContainerOld.addChild(back);
      this.backgroundContainerOld.addChild(zombie);
      this.renderer2.render(this.backgroundContainerOld);

    }
    if (strTr!==undefined && actD < this.props.reduxState.mouseReducer.transicoes.duration)
    {
      let pgX= this.props.reduxState.mouseReducer.pagina.id;
      let backP=(this.props.reduxState.siteApp[pgX].content[0].background)
      let backCl=(this.props.reduxState.siteApp[pgX].content[0].backgroundColor)
      zombieTexture= PIXI.Texture.fromImage(backP);

      var back = new PIXI.Graphics();
      back.beginFill( backCl, 1)
      back.drawRect(0,0,900,800)

      var zombie = new PIXI.Sprite(zombieTexture);
      if((this.backgroundContainer.children.length)>0){
        this.backgroundContainer.removeChildren(0);
      }
      else{

      }
      var backz = new PIXI.Graphics();

      this.backgroundContainer.addChildAt(backz,0);
      this.backgroundContainer.addChildAt(back,1);

      zombie.position.x=100+500-(50*actD);
      zombie.position.y=100;

      this.backgroundContainer.addChildAt(zombie, 2);

      var thing = new PIXI.Graphics();



      this.backgroundContainer.addChildAt(thing,3);

      //thing.clear();

// console.log(this.backgroundContainer.children.length)
      var uX= this.props.reduxState.mouseReducer.transicoes.mouse.x;
      var uY= this.props.reduxState.mouseReducer.transicoes.mouse.y;

      thing.beginFill(0x8bc5ff, 1);
      thing.drawCircle(uX,uY, difT)



      this.backgroundContainer.mask = thing;

      let newCombT = new PIXI.Container();
     newCombT.addChild(this.backgroundContainerOld);
     newCombT.addChild(this.backgroundContainer);

      this.renderer2.render(newCombT);
    }


  };
  componentWillMount(){
    let vv2=      document.getElementById("identdois")//   ReactDom.findDOMNode(this.refs.canvas);
    this.renderer2 = new PIXI.WebGLRenderer(1400, 600,{ view:vv2,  transparent : true});
    //define a pagina que comeca que esta no model
    let d1=new Date();
    // this.props.reduxState.mouseReducer.pagina={
    //   time: d1,
    //   id:"paginaA"};
  }
  componentDidMount(){

      // let vv=   document.getElementById("ident")//   ReactDom.findDOMNode(this.refs.canvas);
      // this.renderer = new PIXI.WebGLRenderer(1400, 600,{ view:vv,  transparent : true});
      let vv2=      document.getElementById("identdois")//   ReactDom.findDOMNode(this.refs.canvas);
      this.renderer2 = new PIXI.WebGLRenderer(1400, 600,{ view:vv2,  transparent : true});
      this.backgroundContainer = new PIXI.Container();

      var graphics2 = new PIXI.Graphics();
      graphics2.lineStyle(80, 0x0000FF, 0.7);
      graphics2.moveTo(320,200);

      var graphics3 = new PIXI.Graphics();
      graphics3.lineStyle(80, 0x30FF00, 1);
      graphics3.moveTo(820,800);
      graphics3.lineTo(30,234);

      document.body.appendChild(this.renderer2.view);

      // for (var i = 0; i < this.props.reduxState.particReducer.length; i++){
      //   let graphics = new PIXI.Graphics();
      //   graphics.lineStyle(40, 0Xe7f418, 0.10);
      //   graphics.moveTo(-20,0);
      //   graphics.lineTo(30,0);
      //   this.stage.addChild( graphics);
      //   this.bunnys.push( graphics);
      // }
      //document.body.appendChild(this.renderer.view);
  }

  componentDidUpdate(){

    var uistate=this.props.reduxState.mouseReducer;
    let pgX= this.props.reduxState.mouseReducer.pagina.id;


    // this.props.reduxState.particReducer.forEach((p,i)=>{
    //   let [x,y] = [p.position[0] , p.position[1]]
    //   let xi= (((i+3)*2+100)%125)+100
    //   //  if(xi<100) xi=xi+80
    //   let mi=  (p.mass*2).toFixed(0)-20
    //   let zi= (mi*xi+20)%255
    //   // a lista de bynnys retorna um que  vai ser tratado agora
    //   var bunny = this.bunnys[i];
    //   // bunny.rotation += 0.01;
    //   bunny.position.x = x;
    //   if(uistate.hotitem!=0)
    //   {
    //     if(uistate.hotitem==="c"){
    //       bunny.tint= 0x000FF0;
    //     }
    //     else {
    //       bunny.tint= 0XFFD4D5;
    //     }
    //   }
    //   else {
    //     this.animacoes={}
    //     bunny.tint= 0Xf70FFF;
    //   }
    //   bunny.position.y = y;
    //   var tesou = this.tesoura[0];
    //   if (uistate.hotitem==0) {
    //     //  tesou.rotation += 0.0001;
    //   }
    //   //if(i==1) console.log(bunny);
    //   // bunny.moveTo(x,y);
    //   let cor= "rgb("+mi+","+ xi+","+zi+")";
    // })

  //  this.renderer.render(this.stage);
  //

    //if(this.height.length!==0)console.log(this.height);
    for (var i = 0; i < this.height.length; i++) {
      this.props.dispatch(this.height[i])
    }

      this.height=[]
  };

  desenhaButao(but,uistate){
    var num= but.nome;
    var top = but.y;
    var left= but.x;
    var subM=(<div/>)
    let filtro=""
    if (uistate.activeitem == num){
      if (uistate.mouseup){
        if(uistate.hotitem==num )  {
          let pgX= this.props.reduxState.mouseReducer.pagina.id;
            if(pgX===undefined) pgX="paginaA";

          let escP=(this.props.reduxState.siteApp[pgX].content[0].menu
            .filter(function(a){if(a.nome==uistate.hotitem) return a })
          );

          if(uistate.hotitem)
          {
            if (escP[0].paginaDestino!==undefined) {
              this.height.push( {
                type: 'GO_TO_PAGE', pagina: escP[0].paginaDestino
              })
              this.height.push( {
                type: 'START_TRANSICAO',
                 transicaoType: "circle",
                   x:this.props.reduxState.mouseReducer.mousex[0].pos,
                   y:this.props.reduxState.mouseReducer.mousey,
                start: new Date(),
                paginaStart:  pgX,
                paginaEnd: escP[0].paginaDestino
              })

            }
          }
          else {

            alert("click no botao  \n\t"+uistate.hotitem)

          }
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
      {// Button is merely 'hot'
        cor="grey"
      }else{
        // Button is both 'hot' and 'active'
        cor="yellow";
      }
    }
    else
    {
      if (uistate.hotitem == num)
      {// Button is merely 'hot'
        cor="green"
        filtro="blur(1px) brightness(0.6)"
        var ttp=0;
        var velocit=
        Math.abs(this.props.reduxState.mouseReducer.mousex[0].pos
          -this.props.reduxState.mouseReducer.mousex[2].pos)
                  // console.log(velocit);
        // if (but.subMenu && velocit <40)
        // subM=but.subMenu.map(
        //   (a,i)=>  {
        //     var nn="";
        //     if(this.animacoes[a.nome]===undefined)
        //     {
        //       ttp=top
        //       this.animacoes[a.nome]={"delta":0.0}
        //     }
        //     else{
        //       nn=a.nome.slice(0,Math.floor(this.animacoes[a.nome].delta/15))
        //       if(this.animacoes[a.nome].delta<60)
        //       {ttp=top+this.animacoes[a.nome].delta
        //         this.animacoes[a.nome]={"delta": this.animacoes[a.nome].delta+3 }
        //       }
        //       else{
        //         nn=a.nome
        //         ttp=top+this.animacoes[a.nome].delta
        //       }
        //     }
        //     return ( <div style={{position: "absolute",
        //       top: (ttp+(64*i))+"px",
        //       left: left+"px",
        //       backgroundColor: cor,
        //       width: this.animacoes[a.nome].delta+"px",
        //       height: "48px",
        //       textAlign: "center"
        //     }}>{nn}{/*i*/}</div>)
        //   })

        }else
        // button is not hot, but it may be active
        cor="blue"
      }

         let backP=  but.paginaDestino

        if(backP===undefined) backP=""
        else backP=this.props.reduxState.siteApp[ but.paginaDestino].content[0].background
      return(
        <div>
          <div style={{position: "absolute",
            top: top+"px",
            left: left+"px",
            width: 64+"px",
            height: "48px",
            textAlign: "center"
          }}>
<img style={{position: "absolute","top": "0px",
  WebkitFilter : filtro,
  left:" -2px",width:"60px",height:"60px",borderRadius:"100%",border:"3px solid #015389"}} src={backP}/>
          </div>

        </div>)
    }

     desenhaCanvas(){
      //return <div></div>
      return (
        <canvas
          style={{
            position:"absolute",
            top:"0",
            left:"0",
            //transform:"rotate(10deg)"
          }}
          id="ident"
          ref="canvas"
          width={600}
          height={600}>
        </canvas>)
    }

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

    desenhaLayerText() {
var nt=new Date()
var nt2=nt-this.props.reduxState.mouseReducer.pagina.time;
if(nt-this.props.reduxState.mouseReducer.pagina.time>1000
){
     let vT=1300-(nt2);
     if(vT<0) vT=0
      let pgX= this.props.reduxState.mouseReducer.pagina.id;
      var {reduxState } = this.props;
      var  text=reduxState.siteApp[pgX].content[0].text
      var sText= text.str;
      let top=text.posy+100,left=text.posx+vT
      return(
      <div style={{
        position: "absolute",
        backgroundColor: "rgba(310, 510, 211, 0.6)",
        paddingLeft: "10px",
        paddingRight: "10px",
        top: top+"px",
        left: left+"px",
        maxWidth: "450px"}}>
        {text.str}
        <h4> </h4>
      </div>
    )
}
   }

  desenhaMenu(){
    var erro= false;
    var {reduxState } = this.props;
    //console.log(this.props.reduxState.mouseReducer.pagina);
    let pgX= this.props.reduxState.mouseReducer.pagina.id;
      if(pgX===undefined) pgX="paginaA";

    //test de overlaping Só testa o 2 com o 3
    var a=reduxState.siteApp[pgX].content[0].menu[2]
    var b=reduxState.siteApp[pgX].content[0].menu[3]
    var bo= false;//this.doOverlap({y:a.y,x:a.x,width: 64,height: 48},
                    //        {y:b.y,x:b.x,width: 64,height: 48})
    // fim teste

       var buts=reduxState.siteApp[pgX].content[0].menu.map(
         a=> this.desenhaButao(a,reduxState.mouseReducer)
       )
       return(
         {error: true ,div:<div>{(buts)}</div>}
       )

  }
//num nome pagina.id  i-index
//pgX nome da pagina escolhida
   desenhaMenuLinha(num,i) {
     var {reduxState } = this.props;
     let uistate=reduxState.mouseReducer;
     let pgX= this.props.reduxState.mouseReducer.pagina.id;
     //var num= l;
     var top = (i*125);
     var left= 0;
     let largura =500
     let altura=125;
     let filtro=""
     let kt=Object.keys(reduxState.siteApp)

     //animacao
     let strTr= (this.props.reduxState.mouseReducer.transicoes.start);
     let difT=(new Date())-strTr
     let actD=Math.floor((difT)/30)
     let zind=0;

     if(pgX!==undefined){ //existe pagina escolhida
       //console.log(pgX);
       if(pgX!=num)//não é a pagina escolhida
       {
         if(actD>160)
         {return <div></div>
          }
        else {
          //  if(kt.indexOf(num)<i)
          //  {
          //    if(actD<60){
          //    top =top-(actD*10);
          //   }
          //  }
           if(actD<90){

             if(kt.indexOf(pgX)>i)
             {
               top =top-(actD*10);
               if(top < 0) top=0
            }
             if(kt.indexOf(pgX)<i)
             {
              //  if(top > 400) top=400
                top =top+(actD*20);
                if((top+altura) > 500) top=500-altura
                zind=4-i;
              //altura =altura-(actD*5);
              //altura =altura-(actD*1);
           }
            //  altura =altura-(actD*20);
          //   if((top)>15 ) altura=0;
          //
          //    altura =altura-(actD*10);
          //    if((altura)<15 ) altura=0;
            }

           }


       }
       else{  // é a pagina escolhida

          zind=10;
           top = (i*110);
          left= 0;
          altura =200;

          if(actD<30){
            //animacao da pagina escolhida
            top=top-actD*10;
            if(top<0) top=0;

            altura =altura+actD*20;
            if((top+altura)>500) altura=500-top;

         }
         else {
            top=0
            altura=500;
         }



        }
    }

     if (uistate.activeitem == num){
       if (uistate.mouseup){
         if(uistate.hotitem==num )  {
           if(uistate.hotitem)
           {
             if (num!==undefined ) {
               let novo_num=num;
               if(num == pgX)  novo_num=undefined
               this.height.push( {
                 type: 'GO_TO_PAGE', pagina: novo_num
               })
                 this.height.push( {
                   type: 'START_TRANSICAO',
                    transicaoType: "paginaLite",
                      x:this.props.reduxState.mouseReducer.mousex[0].pos,
                      y:this.props.reduxState.mouseReducer.mousey,
                   start: new Date(),
                   paginaStart:  pgX,
                   paginaEnd: novo_num
                 })

              }
           }
           else {

             alert("click no botao  \n\t"+uistate.hotitem)

           }
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
    //  console.log(his.regionhit ( left ,  top , largura,  altura) && actD<0 && actD>60 );
    //if inside
     if (this.regionhit ( left ,  top , largura,  altura) ){

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
     if (!this.regionhit ( left ,  top , largura,  altura )){
       if(uistate.hotitem==num )
       this.height.push( {
         type: 'HOT_ITEM', id: 0
       })
     }

     var cor="#"+(reduxState.siteApp[num].content[0]).backgroundColor.toString(16);;
     if (uistate.activeitem == num)
     {
       if(pgX===undefined) {
         top = (i*100);
         altura=200; zind=2;
       }
       if (uistate.hotitem == num)
       {// Button is merely 'hot'
        // cor="grey"
       }else{
         // Button is both 'hot' and 'active'
         cor="yellow";
       }
     }
     else
     {
       if (uistate.hotitem == num)
       {// Button is merely 'hot'
         //cor="green"
         if(pgX===undefined){
           top = (i*100);
           altura=200; zind=2;
          // if(i==3) {top=top-70} //ultimo elemento
           //== console.log(i+"  "+ kt.indexOf(num)   );
       }
         filtro="blur(1px) brightness(0.6)"
         var ttp=0;


         }
         else{
           // button is not hot, but it may be active
           if(pgX===undefined && (uistate.hotitem!=0))//
           {
             top = (i*100);
             altura=100; zind=0 ;
             //console.log
            // console.log(kt.indexOf(uistate.hotitem)>i)
             if(kt.indexOf(uistate.hotitem)<i)
             {
               top = ((i-1)*100)+200;
               altura=100; zind=0 ;
             }
           }
           cor="#"+(reduxState.siteApp[num].content[0]).backgroundColor.toString(16);
         }
       }


       var {reduxState } = this.props;
       let xd=reduxState.siteApp[num]
       var tt=(reduxState.siteApp[num].content[0]);
       var stc=(tt.text.str);



      var backC= cor;//tt.backgroundColor.toString(16);
      var x=(reduxState.mouseReducer.mousex[0].pos);
      var y=(reduxState.mouseReducer.mousey);

      let orf=<div></div>
      if(pgX!==undefined && pgX ==num){ //existe pagina escolhida
            if(actD>20 & actD<50)
              {orf=<div style={{
                  position:"absolute",
                  width: "80%"  ,
                  top: "100px",
                  left:"20px ",
                  color:"black",
                  background: "beige",
                  opacity:"0."+(actD*2),
                }} > {stc} </div>}
            if(actD>=50){
              orf=<div style={{
                  position:"absolute",
                  width: "80%"  ,
                  top: "100px",
                  left:"20px ",
                  color:"black",
                  background: "beige",
                  opacity:"1",
                }} > {stc} </div>
                }
    }

    return(
          <div style={{
              position:"absolute",
              width: "100%"  ,
              top: (top+"px"),

                  overflow: "hidden",
            //  transition: "height .1s linear ,top .1s linear ,maxHeight .1s linear ",
            //  transform: "max-height 0.8s",
              width: "100%",
              cursor: "pointer",
              height: altura+"px",
              background: backC,
            //  minHeight:altura+"px",
              maxHeight:altura+"px",
              zIndex: zind  }} >
                <header style={{display: 'flex', justifyContent: 'space-between', padding: '10px 20px', color: '#fff'}} >
                <img style={{width: 60, height: 60, overflow: "hidden",borderRadius: '100%', border: '3px solid #015389'}} src= {tt.background}   />
                    <div>
                      <h1 style={{margin: 0, fontWeight: 500, fontSize: 25, textAlign: 'right'}}> {num}    </h1>
                      <h3 style={{margin: '4px 0 0', fontWeight: 300, fontSize: 17, opacity: '0.8', textAlign: 'right'}}  >subtitulo</h3>
                  </div>
              </header>
              {orf}
          </div>
     )

   }
   desenhaLi() {
     var {reduxState } = this.props;
     let kt=Object.keys(reduxState.siteApp)
     var x=(reduxState.mouseReducer.mousex[0].pos);
     var y=(reduxState.mouseReducer.mousey);


     let res=(kt.filter(a=>(a!="start") ))
    return res.map(
     (l,i)=>{return this.desenhaMenuLinha (l,i)}
    )
  }

  desenhaCena(){

        this.desenhaBackground( )
    var {error,div}=this.desenhaMenu();
    if(error){
      return( <div>    {this.desenhaCanvas()}
           {div}
           {this.desenhaLayerText()}
           <canvas   style={{
               position:"absolute",
               top:"0",
               left:"0",
               zIndex: "-2"
               //transform:"rotate(10deg)"
             }}
             id="identdois"
             ref="canvasdois"
             width={600}
             height={600}>
           </canvas>
           </div>
         )
    }
  else {
      return  (  <div> {this.desenhaCanvas()}
      {div}
      {this.desenhaLayerText()}
      <canvas   style={{
          position:"absolute",
          top:"0",
          left:"0",
          zIndex: "-2"
          //transform:"rotate(10deg)"
        }}
        id="identdois"
        ref="canvasdois"
        width={600}
        height={600}>
      </canvas>
    </div> )}
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

if(window.outerWidth>800)
    {
      return (
      <div>
  {/*
        <h1>Provider and @connect example</h1>
        <span>
          <b>What time is it?</b>
            <br/>
             { time ? `It is currently ` : 'No idea yet...' }
        <br/>
           {time}

        </span>
         */}
        <br />
        {/* We register our button handler here and use the experimental ES7 function's binding operator "::"
            to have our handler to be bound to the component's instance. */}
            {/*
        <button { ...attrs } onClick={::this.onTimeButtonClick}>Get time!</button>
         */}
        <pre>
{ /*            redux state = { JSON.stringify(reduxState.mouseReducer, null, 2) }
          redux state = { JSON.stringify(reduxState._time, null, 2) }
          redux state = { JSON.stringify(reduxState.siteApp, null, 2) }

 { /*  redux state =JSON.stringify(reduxState, null, 2) */}

        </pre>
        {this.desenhaCena()}
      </div>
    )}
    else {
      return (
        <div id="root">
          <div style={{zIndex:"-1",background:"#f8f8f8",height:"90%",width:"95%" ,position:"absolute",overflow:"hidden",padding:"0",margin:"0"}} >
            {this.desenhaLi()}
          </div>
          <pre style={{zIndex:"100"}}>
          { /*
          redux state = { JSON.stringify(reduxState.mouseReducer, null, 2) }
          redux state = { JSON.stringify(reduxState._time, null, 2) }
          redux state = { JSON.stringify(reduxState.siteApp, null, 2) }

          { /*  redux state =JSON.stringify(reduxState, null, 2)
          */}

          </pre>
      </div>
      )



    }
  }
}
