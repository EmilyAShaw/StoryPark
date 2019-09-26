var input = [[1,2,[3]],4];


function arrayFlatten(array){
	var flattened = [];
	array.forEach(function(value){
		if (Array.isArray(value)){
		flattened = flattened.concat(arrayFlatten(value))
	}

	else{
		flattened.push(value)
	}

	});
return flattened;

}

var output = arrayFlatten(input);

console.log(output);
