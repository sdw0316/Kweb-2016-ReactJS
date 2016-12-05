//control pannel
var total = 8;

//this component show the professor automatically
var ProfessorImage = React.createClass({
	render : function(){
		return (
			<div className="left">
				<img src = {this.props.src}/>
			</div>
		);
	}
});

var ProfessorInfo = React.createClass({
	render : function(){
		return (
			<div className="right">
				<div className="professor-name">
					{this.props.name}
				</div>
				<div className="professor-desc">
					{this.props.desc}
				</div>
			</div>
		);
	}
});

var ProfessorInfoBox = React.createClass({
	render : function(){
		return (
			<div className="info-wrapper">
				<ProfessorImage src={this.props.src}/>
				<ProfessorInfo 
					name = {this.props.name}
					desc = {this.props.desc}/>
			</div>
		);
	}
});


//change the professor info 
var SlectBtns = React.createClass({
	decreaseIndex : function(){
		var index = this.props.index;
		if(index === 0){
			index = total -1;
		}
		else{
			index = (index-1)%total;
		}
		this.props.changeProfessor(index);
	},
	increaseIndex : function(mode){
		var index = this.props.index;
		index = (index+1)%total;
		this.props.changeProfessor(index);
	},

	render : function(){
		var names = [
			"유 혁",
			"박성빈",
			"이희조",
			"오학주",
			"서태원",
			"김효곤",
			"육동석",
			"김현철",
		];
		return (
			<div className = "btn-wrapper">
				<button className="prev-btn" onClick={this.decreaseIndex}>이전</button>
				<span className="professor-name">{names[this.props.index]}</span>
				<button className="next-btn" onClick={this.increaseIndex}>다음</button>
			</div>
		);
	}
});

var Selector = React.createClass({
	//default King Chuck
	getInitialState : function(){
		return {
			"number" : 0,
			"count" : 0,
		};
	},
	changeProfessor : function(n){
		this.setState({
			"number" : n,
		});
	},
	setCount : function(n){
		this.setState({
			"count" : n,
		})
	},
	sendInfo : function(){
		var index = this.state.number;
		this.setCount(this.state.count+1);
		var obj = <Card 
					key={this.state.count}
					name={this.props.names[index]} 
					desc={this.props.descs[index]}
					src={"./image/"+index+".png"}/>;
		this.props.pushInfo(obj);
	},
	render : function(){
		//static information...
		var index = this.state.number;
		return (
			<div className = "selector">
				<ProfessorInfoBox 
					name={this.props.names[index]} 
					desc={this.props.descs[index]} 
					src={"./image/"+index+".png"} />

				<div className="option-wrapper">
					<SlectBtns 
						index={index}
						changeProfessor={this.changeProfessor}/>
					<button 
						className="submit"
						onClick={this.sendInfo}>
						출동!!
					</button>
				</div>
			</div>
		);
	}
});

//each card component show A team Professors
var Card = React.createClass({
	render : function(){
		return (
			<div className = "card">
				<ProfessorInfoBox
					name={this.props.name}
					desc={this.props.desc}
					src={this.props.src}/>
			</div>
		);
	},
});

var CardList = React.createClass({
	render : function(){
		return (
			<div className = "list">
				{this.props.cards}
			</div>
		);
	},
});

var App = React.createClass({
	getInitialState : function(){
		return {
			"cards" : [],
			"names" : [
				"King Chuck",
				"Thunder Park",
				"Asia Pacific Number 1",
				"Mr.O, The Camel",
				"Suh Can You",
				"DC Magic",
				"Machine Six",
				"Data World",
			],
			"descs" : [
				"\"OS는 암기가 아니다. 이해의 과목이다.\"",
				"\"There are many Algorithms...\"",
				"\"쿵 쿵!! (샷건 소리)\"",
				"\"Ok, This is for Today.\"",
				"\"재효, Can you??\"",
				"\"This is Magic!!\"",
				"\"지난 시간에 저희는..\"",
				"\"너는 나에게 데이터가 아니라 정보야..\"",
			],
		};
	},
	pushInfo : function(obj){
		var list = this.state.cards;
		list.unshift(obj);
		this.setState({
			"cards" : list
		});
		console.log(this.state.cards);
	},
	//if Card list get a new info than push it to cards
	render : function(){
		console.log(this.state.cards);
		return(
			<div className="inner">
				<Selector
					names={this.state.names}
					descs={this.state.descs}
					pushInfo={this.pushInfo}/>
				<CardList cards={this.state.cards}/>
			</div>
		);
	}
});

ReactDOM.render(
	<App/>,
    document.getElementById('main')
);