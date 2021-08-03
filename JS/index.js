'use strict'


// create DATA

// {key1:[{},{},{}], key2:{k1:[{},{},[}]] k2:[] ...}}
const company = {
	sales:[{
		id:1,
		name:'Tom',
		salary:200000,
	}, {
		id:2,
		name:'Lola',
		salary:120000,
	}],

	accounting:[{
		id:3,
		name:'Olga',
		salary:320000,
	}, {
		id:4,
		name:'Svetlana',
		salary:210000,
	}],

	administration:{
		topManagers:[{
			id:5,
			name: 'Paul',
			salary:210000000,
		}, {
			id:6,
			name:'Oleg',
			salary: 120000000,
		}],

		administrators:[{
			id:7,
			name:'Kate',
			salary:120000,
		}, {
			id:8,
			name:'Alice',
			salary:102000,
		}]
	},

	engineers:[{
		id:9,
		name:'Tom',
		salary:320000,
	}]
}


// {BMW:[{},{},{}]...}
const cars_v1 = {
	BMW:[{
		id:'1b',
		brand:'BMW',
		model:'x6',
		year:2021,
	}, {
		id:'2b',
		brand:'BMW',
		model:'x5',
		year:2020,
	}, {
		id:'3b',
		brand:'BMW',
		model:'3',
		year:2021,
	}],

	Cadilac:[{
		id:'1c',
		brand:'Cadilac',
		model:'Escalade',
		year:2021,
	}, {
		id:'2c',
		brand:'Cadilac',
		model:'Escalade',
		year:2020,
	}, {
		id:'3c',
		brand:'Cadilac',
		model:'Escalade',
		year:2019,
	}],

	Toyota:[{
		id:'1t',
		brand:'Toyota',
		model:'LC200',
		year:2021,
	}, {
		id:'2t',
		brand:'Toyota',
		model:'RAV4',
		year:2020,
	}, {
		id:'3t',
		brand:'Toyota',
		model:'LC100',
		year:2019,
	}]
}
// [[{name:'BMW'}, {}, {}, {} ...]]
const cars_v2 = [
	// BMW
	[{
		name:'BMW'
	}, {
		id:'1b',
		brand:'BMW',
		model:'x6',
		year:2021,
	}, {
		id:'2b',
		brand:'BMW',
		model:'x5',
		year:2020,
	}, {
		id:'3b',
		brand:'BMW',
		model:'3',
		year:2021,
	}],

	// Cadilac
	[{
		name:'Cadilac',
	}, {
		id:'1c',
		brand:'Cadilac',
		model:'Escalade',
		year:2021,
	}, {
		id:'2c',
		brand:'Cadilac',
		model:'Escalade',
		year:2020,
	}, {
		id:'3c',
		brand:'Cadilac',
		model:'Escalade',
		year:2019,
	}],

	// Toyota
	[{
		name:'Toyota'
	}, {
		id:'1t',
		brand:'Toyota',
		model:'LC200',
		year:2021,
	}, {
		id:'2t',
		brand:'Toyota',
		model:'RAV4',
		year:2020,
	}, {
		id:'3t',
		brand:'Toyota',
		model:'LC100',
		year:2019,
	}]
	
	
]


// Recursion 

// Recursion traversal
// 1. Recursion structure
// 2. Recursion base
// 3. Recursion depth

// goals: a. Deep Clone; b. Search by Conditions; c. Iterations; d. Unpackage; i. Scan


// Test Deep Clone << Recursion >>
// console.log(deepClone(company))
// console.log(company === deepClone(company))
// console.log(company['accounting'][0] === deepClone(company)['accounting'][0])

// console.log(deepClone(cars_v1))
// console.log(cars_v1 === deepClone(cars_v1))
// console.log(cars_v1['Cadilac'][0] === deepClone(cars_v1)['Cadilac'][0])

// console.log(deepClone(cars_v2))
// console.log(cars_v2 === deepClone(cars_v2))
// console.log(cars_v2[0][2] === deepClone(cars_v2)[0][2])




// Test Search By Conditions << Recursion Traversal >>
//? question : return result as : 1. triplet [value, key, parent]  2. value / key 3. parent

// Searc By Condition as compare Descriptor (Acum prop's)  < --- > current Object
const company_descriptor = {
	// id:3,
	salary:120000,
}
console.log(searchByConditions(company, (current_obj)=>{
	for(let key in company_descriptor){
		if(current_obj[key] === undefined) return false
		if(current_obj[key] !== company_descriptor[key]) return false
	}

	return true
}))


const cars_descriptor = {
	brand:'Cadilac',
	year:2020,
}

// 1. cathc string or 2. transformation to String (all simple type's)
console.log(searchByConditions(cars_v1, (current_obj)=>{
	for(let key in cars_descriptor){
		if(current_obj[key] === undefined) return false

		// if(current_obj[key] !== cars_descriptor[key]) return false

		// catch 'string' (method toUpperCase())
		if(dataType(cars_descriptor[key]) === 'string'){
			if(current_obj[key].toUpperCase() !== cars_descriptor[key].toUpperCase()) return false

		// other type's
		}else{
			if(current_obj[key] !== cars_descriptor[key]) return false
		}
	}

	return true
}))

// Deep Clone << Recursion >>
function deepClone(data, clone){
	(isArray(data)) ? clone = []:
	(isObject(data)) ? clone = {}:
							clone = data;

	if(isArray(data)){
		data.forEach(item =>{
			(isObject(item)) ? clone.push(deepClone(item)) : clone.push(item)
		})
	}

	else if(isObject(data)){
		for(let key in data)
			(isObject(data[key])) ? clone[key] = deepClone(data[key]) : clone[key] = data[key]
	}

	return clone;
}

// Search by Conditions << Recursion Traversal >>
function searchByConditions(data, conditions, collection = []){

	if(isArray(data)){
		data.forEach(item =>{
			if(isObject(item)) searchByConditions(item, conditions, collection)
		})
	}

	else if(isObject(data)){
		if (conditions(data)){
			  collection.push(data)
		}else if(isObject(data)){
			for(let key in data)
				if(isObject(data[key])) searchByConditions(data[key], conditions, collection)
		}
	}

	return collection
}





function dataType(data){
	if(isArray(data)) return 'array'
	if(isObject(data)) return 'object'
	if(data === null) return 'null'
	return typeof data
}

function isArray(data){
	return Array.isArray(data)
}
function isObject(data){
	return typeof data === 'object' && data !== null
}
function isEmpty(data){
	if(isArray(data)){
		return data.length === 0
	}else if(isObject(data)){
		return Object.keys(data).length === 0
	}else{
		return data === undefined
	}
}