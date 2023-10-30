const request = require("supertest");
const assert = require("assert");
const server = require("../server");
const path = require("path");

describe("Image Upload API", async function () {
  it("should upload an image and return success message", function (done) {
    request(server)
      .post("/upload")
      .attach("image", path.join(__dirname, "test.png"))
      .field("title", "Test Image")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert.ok(res.body.message, "Image uploaded successfully!");
        request(server)
          .get("/gallery")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.ok(Array.isArray(res.body));
            assert.ok(
              res.body.length > 0,
              "Gallery should have at least one image"
            );
            done();
          });
      });
  });
});

describe("GET /gallery", function () {
  it("should return a list of images", function (done) {
    request(server)
      .get("/gallery")
      .expect(200)
      .end(function (err, res) {
        assert.ok(Array.isArray(res.body));
        done(err);
      });
  });
});

describe("PATCH /update/:id", function () {
  it("should update the title of an image", function (done) {
    const newTitle = "Updated Title";
    const idToUpdate = 0;

    request(server)
      .patch(`/update/${idToUpdate}`)
      .send({ title: newTitle })
      .expect(200)
      .end(function (err, res) {
        assert.ok(res.body.message, "Image title updated successfully!");

        request(server)
          .get("/gallery")
          .expect(200)
          .end(function (err, res) {
            assert.ok(res.body[0].title, newTitle);
            done(err);
          });
      });
  });
});

describe("DELETE /delete/:id", function () {
  it("should delete an image", function (done) {
    const idToDelete = 0;

    request(server)
      .delete(`/delete/${idToDelete}`)
      .expect(200)
      .end(function (err, res) {
        assert.ok(res.body.message, "Image deleted successfully!");
        request(server)
          .get("/gallery")
          .expect(200)
          .end(function (err, res) {
            assert.ok(!res.body.find((img) => img.id === idToDelete));
            done(err);
          });
      });
  });
});
