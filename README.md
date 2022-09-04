# Courses-platform-API-using-Node.js
simple concept proving
- This api to store and retrieve  courses data
- each course has id, name, start date and end date
- this api do CRUD ops for courses blus searching feature by any attributes as much as you want
- save in jason file input.json
 - below ..... Note: after ":" is a variable, ex: for "/:name" -> "/java"

| Purpose  |request type | path |description|
| ------ | ------ |------ |------ |
|test|  Get| / | reply "Hello world" |
|Get all courses |Get| /api/courses|
|get by id|Get|/api/courses/id/:id
|get by name|Get|/api/courses/id/:name
|Courses from date|Get|/api/courses/datefrom/:date
|search|Get|/api/courses/search/:paramsString|by any attribute
