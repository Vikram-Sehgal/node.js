# Bash Shell Script

# /posts 
curl -H "Content-Type: application/json" -X POST -d '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": "--"}' "http://localhost:3000/posts"
curl -H 'Content-Type: application/json' -X POST -d '{"name": "Vikram Sehgal", "url": "http://Sehgaltech.com", "text": "Must visit sehgaltech.com"}' 'http://localhost:3000/posts'
curl -H 'Content-Type: application/json' -X PUT -d '{"name": "Sehgal Vikram", "url": "http://techSehgal.com", "text": "Must visit techSehgal.com"}' 'http://localhost:3000/posts/1'
curl 'http://localhost:3000/posts' -iv
curl -X DELETE "http://localhost:3000/posts/1"


# /comments
curl -H 'Content-Type: application/json' -X POST -d '{"text": "(p1,p2)=>{ … } ,i understand this ,thank you !"}' 'http://localhost:3000/posts/0/comments'
curl -H 'Content-Type: application/json' -X POST -d '{"text": "Vikram Sehgal is a best programmer."}' 'http://localhost:3000/posts/0/comments'
curl -H 'Content-Type: application/json' -X PUT -d '{"text": "Sehgal Saab"}' 'http://localhost:3000/posts/0/comments/0'
curl 'http://localhost:3000/posts/0/comments' -iv
curl -X DELETE 'http://localhost:3000/posts/0/comments/0'

# curl -X DELETE 'http://localhost:3000/posts/0'   remove all of blog post components
