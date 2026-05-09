let total=0;

let tools=[];

let chart;

function scrollToForm(){

	document
	.getElementById('auditForm')
	.scrollIntoView({behavior:"smooth"});
}

function refreshToolList(){

	let toolList = 
	document.getElementById("toolList");

	toolList.innerHTML = "";

	if(tools.length ===0 ){

		toolList.innerHTML = "<p>NO tools added yet.</p>";
		return;
	}

	tools.forEach((tool,index)=>{

		let li =
		document.createElement("li");

		li.innerHTML =
		`${tool.name} - ₹${tool.cost}

		<button onclick='removeTool(${index})'>
		Remove
		</button>`;

		toolList.appendChild(li);
	});
}

function addTool(){

	let toolName=
	document.getElementById("toolName").value;

	let toolCost=
	Number(document.getElementById("toolCost").value);

	let teamSize=
	document.getElementById("teamSize").value;

	if(toolName==="" || toolCost <= 0){
		alert("please fill all fields");
		return;

	}

	//store tool
	tools.push({
		name:toolName,
		cost:toolCost
	});

	//local storage data saved in browser
	localStorage.setItem(
		"aiTools",
		JSON.stringify(tools)
		);

	//update total
	total += toolCost;

	document.getElementById(
		"totalSpend"
		).innerText="₹" + total;

	//saving logic
	let savings = Math.floor(total * 0.15);

	let score = 100;

	if(total > 5000){
		score = 60;
	}
	else if(total > 3000){
		score = 75;
	}
	else if(total > 1500){
		score=85;
	}

	document.getElementById(
		"score"
		).innerText = score + "%";

	document.getElementById(
		"savings"
		).innerText="₹" + savings;

	//add tool to list
	let li = document.createElement("li");

	li.innerHTML= `${toolName} - ₹${toolCost}
	<button onclick='removeTool(${tools.length - 1})'>
	Remove
	</button>`;
	

	document.getElementById(
		"toolList"
		).appendChild(li);

	//Ai summary
	let summaryText=
	`your team currently spends ₹${total} monthly on Ai tools.`;

	if(total > 5000){
		summaryText +=
		`your AI expenses are high.Consider switching to team plans or reducing unused subscriptions.`;
	}
	else if(total > 3000){
		summaryText += 
	`your spending is moderate,but optimization oppurtunities exist.`;
	}
	else{
		summaryText +=
		"your spending efficiency looks strong";
	}

	document.getElementById(
		"summary"
		).innerText = summaryText;

	updateChart();

	//clear inputs
	document.getElementById("toolName").value="";
	document.getElementById("toolCost").value="";
	document.getElementById("teamSize").value="";
}

function removeTool(index){
	total -= tools[index].cost;

	tools.splice(index,1);

	document.getElementById(
		"totalSpend"
		).innerText = "₹" + total;

	let savings = Math.floor(total * 0.15);

	document.getElementById(
		"savings"
		).innerText = "₹" + savings;

	refreshToolList();

	updateChart();

	localStorage.setItem(
		"aiTools",
		JSON.stringify(tools)
		);
}

function updateChart(){

	let labels = tools.map(t => t.name);
	let data = tools.map(t => t.cost);

	let ctx =
	document.getElementById('expenseChart');

	if(chart){
		chart.destroy();
	}

	chart = new Chart(ctx,{
		type:'pie',

		data:{
			labels:labels,

			datasets:[{
			data:data}]
		},

		options:{
			responsive:true
		}
	});
}
//download report
	function downloadReport() {
		
		let report =
	`AI Spend Report\n\n`;

	tools.forEach(tool=>{

		report += `${tool.name} - ₹${tool.cost}\n`;
	});

	report += 
	`\nTotal Spend: ₹${total}`;

	let blob =
	new Blob([report],{
		type:"text/plain"
	});

	let a =
	document.createElement("a");

	a.href = URL.createObjectURL(blob);

	a.download = 
	"AI_Report.txt";

	a.click();
	
};

//auto load saved tool
window.onload = function(){

	let savedTools = 
	localStorage.getItem("aiTools");

	if(savedTools){

		tools = JSON.parse(savedTools);
		total=0;
		tools.forEach(tool=>{

			total += tool.cost;
		});

		document.getElementById(
			"totalSpend"
			).innerText="₹" + total;

		let savings = Math.floor(total * 0.15);

		document.getElementById(
			'savings'
			).innerText = "₹" + savings;

		refreshToolList();

		updateChart();
	}
};
	
	