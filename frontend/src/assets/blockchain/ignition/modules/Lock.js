const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("LockModule", async() => {
  const TaskToDo = await ethers.getContractFactory("TaskToDo");
  
    // Start deployment, returning a promise that resolves to a contract object
    const TaskToDo_ = await TaskToDo.deploy();
    console.log("Contract address:", TaskToDo_.address);
});
