import { expect } from "chai";
import sinon from "sinon";
import { movieController } from "../movieController.js";
import * as movieServiceModule from "../movieService.js";
// importing as a module allows us to stub exported functions properly

describe("Controller tests with service behavior mocked", function () {
  afterEach(() => sinon.restore());

  // ------------------------------------------------------
  // 1. getBestMovie() — mock service.getTopRated()
  // ------------------------------------------------------
  it("getBestMovie should return the first movie from getTopRated()", function () {
    const fakeTopRated = [
      { title: "Atlantis", rating: 99 },
      { title: "Treasure Planet", rating: 97 },
      { title: "Hercules", rating: 95 },
    ];

    // stub service.getTopRated()
    const stub = sinon
      .stub(movieServiceModule.movieService, "getTopRated")
      .returns(fakeTopRated);

    const best = movieController.getBestMovie();

    expect(best).to.deep.equal({ title: "Atlantis", rating: 99 });
    expect(stub.calledOnce).to.be.true;
  });

  // ------------------------------------------------------
  // 2. addMovie() — ensure controller forwards correctly to service.add()
  // ------------------------------------------------------
  it("addMovie should call movieService.add with correct args", function () {
    const stub = sinon
      .stub(movieServiceModule.movieService, "add")
      .returns(true);

    const movie = { title: "Bolt", rating: 85 };

    const result = movieController.addMovie(movie);

    expect(result).to.equal(true);
    expect(stub.calledOnceWith(movie)).to.be.true;
  });

  // ------------------------------------------------------
  // 3. removeMovie() — mock ensures controller calls remove()
  // ------------------------------------------------------
  it("removeMovie should call movieService.remove and return result", function () {
    const mock = sinon.mock(movieServiceModule.movieService);

    mock.expects("remove").once().withArgs("Moana").returns(true);

    const removed = movieController.removeMovie("Moana");
    expect(removed).to.be.true;

    mock.verify();
  });

  // ------------------------------------------------------
  // 4. printRandomMovie() — spy on logMovie() to ensure it's called
  // ------------------------------------------------------
  it("printRandomMovie should call movieService.logMovie()", function () {
    // stub getAllMovies so sort doesn't use real array
    sinon.stub(movieServiceModule.movieService, "getAllMovies").returns([
      { title: "Atlantis", rating: 99 },
      { title: "Treasure Planet", rating: 97 },
      { title: "Hercules", rating: 95 },
    ]);

    const logStub = sinon
      .stub(movieServiceModule.movieService, "logMovie")
      .returns();

    // spy logMovie() would still let it interact with movie service
    // const spy = sinon.spy(movieServiceModule.movieService, "logMovie");

    movieController.printRandomMovie();
    expect(logStub.calledOnce).to.be.true;

    movieController.printRandomMovie();
    expect(logStub.calledTwice).to.be.true;
  });
});
