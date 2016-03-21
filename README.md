# UltiLogger #

## Feature Request: Add Migrations

## Feel free to work and send pull request ##

## How to use ##

### Installation Guide ###

1. Clone the project via
    <pre>git clone https://github.com/c7devteam/UltiLogger.git</pre>
    
2. Install dependencies
    <pre>npm install</pre>
    
3. Copy or rename `config/config.json.sample` to `config/config.json`


4. Run `npm start` to start server (require nodemon)



## API ##

### create an application ###

#### default application is not activated (set active = 1 in database)

    POST /admin/applications
    
#### Body-Parameter ####
* name (required)

#### sample request ####

```json
curl -X "POST" "http://localhost:3000/admin/applications" \
	-H "Content-Type: application/x-www-form-urlencoded" \
	--data-urlencode "name=my super app"

```

#### Response on success ####
```json
{
  "success": true,
  "message": "created new application"
}
```

#### Response on error ####
```json
{
  "success": false,
  "message": "name already taken"
}
```

### create text log ###

    POST /logs/text
    
#### Header-Parameter ####
* Authorization (required, get from applications table)


#### Body-Parameter ####

* text (required)
* tags (comma separated, optional)

#### sample request with tags ####
```json
curl -X "POST" "http://localhost:3000/logs/text" \
	-H "Authorization: qFD2G05N9XmWMAnA" \
	-H "Content-Type: application/json" \
	-d "{\"text\":\"text with tags\",\"tags\":\"one, two, three\"}"

```

#### sample request ####
```json
curl -X "POST" "http://localhost:3000/logs/text" \
	-H "Authorization: qFD2G05N9XmWMAnA" \
	-H "Content-Type: application/json" \
	-d "{\"text\":\"text without tags\"}"
```

#### response on success ####
```json
{
  "success": true,
  "message": "created text log"
}
```

#### response on error ####
```json
{
  "success": false,
  "message": "no token provided"
}
```

```json
{
  "message": "Your application is not authorized"
}
```


### create request log ###

    POST /logs/request
    
#### Header-Parameter ####
* Authorization (required, get from applications table)


#### Body-Parameter ####

* username
* action
* controller
* params

#### sample request ####
```json
curl -X "POST" "http://localhost:3000/logs/request" \
	-H "Authorization: qFD2G05N9XmWMAnA" \
	-H "Content-Type: application/json" \
	-d "{\"username\":\"mludi\",\"action\":\"createLogAction\",\"controller\":\"LogController\",\"params\":\"username, applications_id\"}"

```


#### response on success ####
```json
{
  "success": true,
  "message": "created request log"
}
```

#### response on error ####
```json
{
  "success": false,
  "message": "no token provided"
}
```

```json
{
  "message": "Your application is not authorized"
}
```