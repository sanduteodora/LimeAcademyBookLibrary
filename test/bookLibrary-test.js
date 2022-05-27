const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BookLibrary", function () {   
    let BookLibraryFactory;
    let BookLibrary;
    before(async () => {
        BookLibraryFactory = await ethers.getContractFactory("BookLibrary");
        BookLibrary = await BookLibraryFactory.deploy();
        await BookLibrary.deployed();
    });


    it("Should add a new book and return the number of current books", async function () {
        //const Book = ["Cinderella",2,true,9,0x0000000000000000000000000000000000000000];
        const bookTx = await BookLibrary.addBooks("Cinderella", 1);
        await bookTx.wait();
        const bookTxTwo = await BookLibrary.addBooks("Red Riding Hood", 1);
        await bookTxTwo.wait();
        expect(await BookLibrary.returnBookArrayLength()).to.equal(2); // WE ADDED TWO BOOKS
    });


    it("Should borrow a book ", async function () {
        const bookTx = await BookLibrary.borrowBook("Cinderella", 1);
        await bookTx.wait();
        expect(await BookLibrary.returnTotalBookCount()).to.equal(1); // WE BORROWED ONE BOOK
    });

    it("Should return the book ", async function () {
        const bookReturnTx = await BookLibrary.returnBook("Cinderella", 1);
        await bookReturnTx.wait();
        expect(await BookLibrary.returnTotalBookCount()).to.equal(2); // WE RETURNED ONE BOOK
    });

/* 
    it("Should return the election status", async function () {
        expect(await BookLibrary.electionEnded()).to.equal(false); // Not Ended
    });



    it("Should throw when try to submit already submitted state results", async function () {
        const stateResults = ["California",1000,900,32];
        expect(BookLibrary.submitStateResult(stateResults)).to.be.revertedWith('This state result was already submitted!');
    });

    it("Should submit state results and get current leader", async function () {
        const stateResults = ["Ohaio",800,1200,33];
        const submitStateResultsTx = await BookLibrary.submitStateResult(stateResults);
        await submitStateResultsTx.wait();
        expect(await BookLibrary.currentLeader()).to.equal(2); // TRUMP
    });

    it("Should end the elections, get the leader and election status", async function () {
        const endElectionTx = await BookLibrary.endElection();
        await endElectionTx.wait();
        expect(await BookLibrary.currentLeader()).to.equal(2); // TRUMP
        expect(await BookLibrary.electionEnded()).to.equal(true); // Ended
    });
 */

});