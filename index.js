const querystring = require('querystring')
const requestPromise = require('minimal-request-promise')
const { toBase64, generateHeaders } = require('./utils')

/**
*  Nethunt client
*  @param {string} username - Nethunt username
*  @param {string} password - Nethunt password 
*/
class Nethunt {
  /**
  *   Creates a new nethunt client and turns credentials
  *   to base64 for basic auth Authorization header
  *   @param {string} username - Nethunt username
  *   @param {string} password - Nethunt password 
  */
  constructor(username, password) {
    if (!username) { throw Error('Username cannot be blank') }
    if (!password) { throw Error('Password cannot be blank') }

    this.options = generateHeaders(
      toBase64(username, password)
    )
  }

  /** 
  * List all accessible folders 
  * @example [
  *      {
  *          "id": "596f644b8f6d05e16c24b810",
  *          "name": "My first folder"
  *      },
  *      {
  *          "id": "596f644b8f6d05e16c24b811",
  *          "name": "My second folder"
  *      }
  *  ]
  * @returns {Array} List of readable folders
  */
  readableFolder () {
    return requestPromise.get('https://nethunt.com/api/v1/zapier/triggers/readable-folder', this.options)
      .then(res => JSON.parse(res.body))
  }

  /** 
  * List folders which the user can create records in
  * @return {Array} Array of folders which the user can create records in
  * @example  [
  *    {
  *        "id": "596f644b8f6d05e16c24b810",
  *        "name": "My first folder"
  *    },
  *    {
  *        "id": "596f644b8f6d05e16c24b811",
  *        "name": "My second folder"
  *    }
  *  ]
  */
  writableFolder () {
    return requestPromise.get('https://nethunt.com/api/v1/zapier/triggers/writable-folder', this.options)
      .then(res => JSON.parse(res.body))
  }

  /**
   * List folder fields
   * @param  {string} folderId - Folder ID to list fields 
   * @return {Array} 
   */
  folderField (folderId) {
    return requestPromise.get(`https://nethunt.com/api/v1/zapier/triggers/folder-field/${folderId}`, this.options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} folderId
   * @param {*} params
   * @return {*} 
   * @memberof Nethunt
   */
  findRecord (folderId, params) {
    return requestPromise.get(
      `https://nethunt.com/api/v1/zapier/searches/find-record/${folderId}?query=${querystring.stringify(params)}`, this.options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} folderId
   * @param {*} params
   * @return {*} 
   * @memberof Nethunt
   */
  newRecord (folderId, params) {
    return requestPromise.get(
      `https://nethunt.com/api/v1/zapier/triggers/new-record/${folderId}?${querystring.stringify(params)}`, this.options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} folderId
   * @param {*} params
   * @return {*} 
   * @memberof Nethunt
   */
  newComment (folderId, params) {
    return requestPromise.get(
      `https://nethunt.com/api/v1/zapier/triggers/new-comment/${folderId}?${querystring.stringify(params)}`, this.options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} folderId
   * @param {*} params
   * @return {*} 
   * @memberof Nethunt
   */
  updatedRecord (folderId, params) {
    return requestPromise.get(
      `https://nethunt.com/api/v1/zapier/triggers/updated-record/${folderId}?${querystring.stringify(params)}`, this.options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} folderId
   * @param {*} params
   * @return {*} 
   * @memberof Nethunt
   */
  recordChange (folderId, params) {
    return requestPromise.get(
      `https://nethunt.com/api/v1/zapier/triggers/record-change/${folderId}?${querystring.stringify(params)}`, this.options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} folderId
   * @param {*} body
   * @return {*} 
   * @memberof Nethunt
   */
  createRecord (folderId, body) {
    return requestPromise.post(
      `https://nethunt.com/api/v1/zapier/actions/create-record/${folderId}`, {
      body: JSON.stringify(body),
      ...this.options
    })
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} folderId
   * @param {*} body
   * @return {*} 
   * @memberof Nethunt
   */
  createComment (recordId, body) {
    return requestPromise.post(
      `https://nethunt.com/api/v1/zapier/actions/create-comment/${recordId}`, {
      body: JSON.stringify(body),
      ...this.options
    })
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} recordId
   * @param {*} body
   * @return {*} 
   * @memberof Nethunt
   */
  createCallLog (recordId, body) {
    return requestPromise.post(
      `https://nethunt.com/api/v1/zapier/actions/create-call-log/${recordId}`, {
      body: JSON.stringify(body),
      ...this.options
    })
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} folderId
   * @return {*} 
   * @memberof Nethunt
   */
  updateRecord (recordId, body) {
    return requestPromise.post(
      `https://nethunt.com/api/v1/zapier/actions/update-record/${recordId}`, {
      body: JSON.stringify(body),
      ...this.options
    })
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} recordId
   * @param {*} body
   * @return {*} 
   * @memberof Nethunt
   */
  linkGmailThread (recordId, body) {
    return requestPromise.post(
      `https://nethunt.com/api/v1/zapier/actions/link-gmail-thread/${recordId}`, {
      body: JSON.stringify(body),
      ...this.options
    }
    )
  }

  /**
   *
   *
   * @return {*} 
   * @memberof Nethunt
   */
  authTest () {
    return requestPromise.get('https://nethunt.com/api/v1/zapier/triggers/auth-test', this.options)
      .then(res => JSON.parse(res.body))
  }
}

module.exports = Nethunt