// new conditions object; key=condition name; value=filepath to icon
	const NewCon = {
		"melting" : "icons/svg/acid.svg",
		"anchored" : "icons/svg/anchor.svg",
		"radioactive" : "icons/svg/biohazard.svg",
		"greedy": "icons/svg/coins.svg",
		"burning" : "icons/svg/fire.svg",
		"mute" : "icons/svg/sound-off.svg"
	};
	
// TRUE = conditions on the character sheet; FALSE = only on the token
	let isCondition = true;

// Init Hook
Hooks.once("init", async () => {

	// Register Settings for new conditions
		await registerConditionSettings();
	// get list of new conditions and add them
		await addNewConditions();
}); //end init hook


// function for registering all the additional condition settings
async function registerConditionSettings() {
	let allSettings = Object.keys(NewCon);
	allSettings.forEach ((i)=>{
		let C = i.charAt(0).toUpperCase()+i.slice(1);
		console.log(C);
		game.settings.register('cosmere-rpg-condition-tool', `condition-${i}`, {
			name: `${C} Condition`,
			hint: `Enables the ${C} Condition.`,
			scope: 'world',
			config: true,
			type: new foundry.data.fields.BooleanField(),
			default: true,
			requiresReload: true
			}
		);	
	});
};

async function addNewConditions() {

	let newConditions = [];
	let conditionList = Object.keys(NewCon);
	conditionList.forEach((i)=> {
		if(game.settings.get('cosmere-rpg-condition-tool','condition-'+i)) {
		newConditions.push(i);
		}
	});	
	console.log("New Conditions are: "+newConditions);

	newConditions.forEach((i)=> {
		console.log("Current effect: "+i); 
		let capLabel = i.charAt(0).toUpperCase()+i.slice(1);
		let effects = {
			[i] : {
				label: capLabel,
				icon: NewCon[i]
			}
		};
		
		console.log(effects);

		for (const [k, v] of Object.entries(effects)) {
			CONFIG.statusEffects.push({
			  id: k,
			  name: v.label,
			  img: v.icon,
			  _id: `cond${k}`.padEnd(16, '0')
			});
		CONFIG.COSMERE.statuses[k] = {label: v.label, icon: v.icon, condition: isCondition};
	  };
	  
	});

};
