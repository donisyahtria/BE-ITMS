import express from "express";
import bodyParser, { json } from "body-parser";
import cors from "cors";
import addevent from "./routes/event/createevent"
import deadline from "./routes/event/createdeadline"
import headcom from "./routes/event/getheadcommit"
import jobfam from "./routes/event/getjobfamily"
import joblevel from "./routes/event/getjoblevel"
import commite from "./routes/event/getcommit"
import question from "./routes/event/getpertanyaan"
import filterkaryawan from "./routes/kts/getfiltertalentsource"
import underperson from "./routes/kts/filterunderpersonbyuserlogin"
import getkomiteunit from "./routes/kts/getatasanbykts"
import updatebool from "./routes/kts/updateboolkts"
import talentprofile from "./routes/talentprofile/createtalentprofile"
import carikomiteotomatis from "./routes/kts/carikomiteunitotomatis"
import paktacommit from "./routes/talentprofile/updatepaktacommit"
import tqualification from "./routes/qualification/createqualification"
import skorkt1 from "./routes/qualification/skorkt1"
import comparenilai from "./routes/qualification/comparenilaikt1"
import tdays from "./routes/days/createtalentdays"
import updatedays from "./routes/days/updatenilai"
import createqual from "./routes/cluster/createtalentcluster"
import hitungcluster from "./routes/cluster/hitungcluster"
import createpool    from "./routes/Pool/createtalentpool"

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
app.use("/", paktacommit)
app.use("/", tqualification)
app.use("/", skorkt1)
app.use("/", comparenilai)
app.use("/", tdays)
app.use("/", updatedays)
app.use("/", createqual)
app.use("/", hitungcluster)
app.use("/", createpool)

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
