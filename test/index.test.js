var expect = require("chai").expect;

const request = require("supertest");
const express = require("express");

const app = express();

describe("POST /images", function() {
  it("should have an x-test header with file name as value", function(done) {
    request(app)
      .post("/images")
      .set("x-test", "2.jpeg")
      .attach("myImage", "test/images/2.jpeg")
      .end((err, req) => {
        expect("x-test", "2.jpeg");

        done();
      });
  });
});
