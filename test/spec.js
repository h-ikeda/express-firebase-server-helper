"use strict";

const express = require("express");
const request = require("superagent");
const middleware = require("../index");
const assert = require("assert");

describe("/firebase-server", function() {
    let app;
    beforeEach(function() {
        app = express();
        app.use("/firebase-server", middleware());
    });
    it("/port", function(done) {
        app.listen(39283);
        request.get("http://localhost:39283/firebase-server/port").then(data => {
            try {
                assert(/\d+/.test(data.text));
                done();
            } catch(e) {
                done(e);
            }
        });
    });
    it("/get-value", function(done) {
        app.listen(37243);
        request.get("http://localhost:37243/firebase-server/get-value").then(data => {
            try {
                assert.equal(typeof data.body, "object");
                done();
            } catch(e) {
                done(e);
            }
        });
    });
    it("/export-data", function(done) {
        app.listen(24953);
        request.get("http://localhost:24953/firebase-server/export-data").then(data => {
            try {
                assert.equal(typeof data.body, "object");
                done();
            } catch(e) {
                done(e);
            }
        });
    });
    it("invalid path", function(done) {
        app.use((req, res) => {
            res.send("Next called and finally response.");
        });
        app.listen(62243);
        request.get("http://localhost:62243/firebase-server/invalid-request").then(data => {
            try {
                assert.equal(data.text, "Next called and finally response.");
                done();
            } catch(e) {
                done(e);
            }
        });
    });
});