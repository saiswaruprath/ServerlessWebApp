## code for first action to verify parameters and return json string with document that contains details.

function main(params) {
  if (!params.name || !params.comment) {
    return Promise.reject({ error: 'no name or comment'});
  }

  return {
    doc: {
      createdAt: new Date(),
       name: params.name,
       email: params.email,
       comment: params.comment
    }
  };
}


{
  "name": "John Smith",
  "email": "john@smith.com",
  "comment": "this is my comment"
}

function main(params) {
  return {
    params: {
      include_docs: true
    }
  };
}



const md5 = require('spark-md5');

function main(params) {
  return {
    entries: params.rows.map((row) => { return {
      name: row.doc.name,
      email: row.doc.email,
      comment: row.doc.comment,
      createdAt: row.doc.createdAt,
      icon: (row.doc.email ? `https://secure.gravatar.com/avatar/${md5.hash(row.doc.email.trim().toLowerCase())}?s=64` : null)
    }})
  };
}
