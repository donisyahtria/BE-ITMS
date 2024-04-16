import express from "express";
import bodyParser, { json } from "body-parser";
import cors from "cors";
import joblevel from "./routes/getjoblevel"
import addevent from "./routes/createevent"
import jobfam from "./routes/getjobfamily"
import headcom from "./routes/getheadcommit"
import commite from "./routes/getcommit"
import question from "./routes/getpertanyaan"
import deadline from "./routes/createdeadline"
import filterkaryawan from "./routes/getfiltertalentsource"
import underperson from "./routes/filterunderpersonbyuserlogin"
import getkomiteunit from "./routes/getatasanbykts"
import updatebool from "./routes/updateboolkts"
import talentprofile from "./routes/createtalentprofile"
import carikomiteotomatis from "./routes/carikomiteunitotomatis"

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
        origin: "http://localhost:5173",
        methods: "GET, POST, PUT, HEAD, PATCH, DELETE",
        credentials:true
    })
);

app.use("/", joblevel)
app.use("/", jobfam)
app.use("/", addevent)
app.use("/", headcom)
app.use("/", commite)
app.use("/", question)
app.use("/", deadline)
app.use("/", filterkaryawan)
app.use("/", underperson)
app.use("/", getkomiteunit)
app.use("/", updatebool)
app.use("/", talentprofile)
app.use("/", carikomiteotomatis)

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
