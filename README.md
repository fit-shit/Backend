# Backend
Puttin in the back end


### Function List
Below is a list of the functions included and a brief description of how they work and what is to be included in their request.

## **createExercise**
https://us-central1-movement-tracker-457bc.cloudfunctions.net/createExercise

Creates new exercise in database and returns the new push ID.

**Send JSON data**
```javascript
{
	"name":"Seated Alternating Curl",
	"description" : "Seated with dumbells in both hands, pull your shoulders back and contact one arm while rotating so the weight is horizontal. Control the weight down, rotating back to a straight position. Repeat with the other arm.",
	"is_timed":false
}
```
**Returns JSON data**
```javascript
{
  "pushKey": "-LSDFN4927JN2J13B"
}
```


## **createUID**
https://us-central1-movement-tracker-457bc.cloudfunctions.net/createUID



## **createWorkout**
https://us-central1-movement-tracker-457bc.cloudfunctions.net/createWorkout

**Send JSON data**
```javascript
{
	"name":"Chest",
	"image_A":"chest-front",
	"image_B":"chest-back",
	"target_gender":"m",
	"estimated_length":60,
	"exercises":[
		{
			"id": "-Lewun7pp2mxfezveCUz",
			"reps": [16,12,9,6,9],
			"sets":5
		},
		{
			"id": "-Lewv4q0E2X_PrLVj8lz",
			"reps": [16,12,9,6,9],
			"sets":5
		},
		{
			"id": "-LewvjO4O9Hr5CZ_uPE0",
			"reps": [16,12,9,9,9],
			"sets":5
		},
		{
			"id": "-LewvaNqTDuQ7XapsC8l",
			"reps": [16,12,9,6,9],
			"sets":5
		},
		{
			"id": "-LewuxeBo3rJ3ZK6S5zf",
			"reps": [16,12,9,9,9],
			"sets":5
		}
	]
}
```
**Returns JSON data**
```javascript
{
  "pushKey": "-LSDFN4927JN2J13B"
}
```
## **dataPross**
https://us-central1-movement-tracker-457bc.cloudfunctions.net/dataPross


## **endSession**
https://us-central1-movement-tracker-457bc.cloudfunctions.net/endSession
