import express from "express";
import bodyParser, { json } from "body-parser";
import cors from "cors";
import getevent from "./routes/event/getallevent"
import addevent from "./routes/event/createevent"
import deadline from "./routes/event/createdeadline"
import headcom from "./routes/event/getheadcommit"
import jobfam from "./routes/event/getjobfamily"
import joblevel from "./routes/event/getjoblevel"
import commite from "./routes/event/getcommit"
import question from "./routes/event/getpertanyaan"
import filterkaryawan from "./routes/kts/getfiltertalentsource"
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
import createqualalt from "./routes/qualification/createqual_alt"
import skordays from "./routes/days/updatenilai"
import joblevelfilter from "./routes/kts/getjoblevelfilter"
import hapusevent       from "./routes/event/hapusevent"
import createprofile    from "./routes/talentprofile/createtalentprofile"
import detailnilai      from "./routes/days/getdetailnilai"
import getalldays       from "./routes/days/getalldays"
import getoneevent      from "./routes/event/getoneevent"
import updatedeadline   from "./routes/event/updatedeadline"
import getsourcefalse        from "./routes/kts/getkandidatfalse"
import getsourcetrue        from "./routes/kts/getkandidattrue"
import getkomiteunitlist from "./routes/kts/getkomitelist"
import getjoblevelactive from "./routes/event/getactivejoblevel"
import loginadmin from "./routes/login/login";
import getkaryawan from "./routes/login/getkaryawan";
import geteventbykaryawan from "./routes/event/geteventbykaryawan"
import geteventbykomite from "./routes/event/geteventbykomite"
import gettalentsource from "./routes/kts/gettalentsource"
import getbelumlengkap from "./routes/talentprofile/getbelumlengkap"
import getlengkap from "./routes/talentprofile/getlengkap"
import getquallolos   from "./routes/qualification/getqualificationlolos"
import getqualification from "./routes/qualification/getqualification"
import gettalentpool from "./routes/Pool/gettalentpool"
import getkkm         from "./routes/qualification/getnilaiminimal"
import gettabledayskaryawan from "./routes/days/getdaystable"
import gettabledaysbpj from "./routes/days/getdaysbpj"

const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Login
app.use("/", loginadmin);
app.use("/", getkaryawan);

//general
app.use("/", updatedeadline)

// Event
app.use("/",getevent)
app.use("/", joblevel)
app.use("/", jobfam)
app.use("/", addevent)
app.use("/", headcom)
app.use("/", commite)
app.use("/", question)
app.use("/", deadline)
app.use("/", hapusevent)
app.use("/", getoneevent)
app.use("/", getjoblevelactive)
app.use("/", getevent);
app.use("/",geteventbykaryawan)
app.use("/",geteventbykomite)
app.use("/", joblevel);
app.use("/", jobfam);
app.use("/", addevent);
app.use("/", headcom);
app.use("/", commite);
app.use("/", question);
app.use("/", deadline);
app.use("/", hapusevent);

// KTS
app.use("/", filterkaryawan)
app.use("/", getkomiteunit)
app.use("/", updatebool)
app.use("/", talentprofile)
app.use("/", carikomiteotomatis)
app.use("/", joblevelfilter)
app.use("/", getsourcefalse)
app.use("/", getsourcetrue)
app.use("/", getkomiteunitlist)
app.use("/", gettalentsource)

app.use("/", filterkaryawan);
app.use("/", getkomiteunit);
app.use("/", updatebool);
app.use("/", talentprofile);
app.use("/", carikomiteotomatis);
app.use("/", joblevelfilter);

// Profile
app.use("/", paktacommit);
app.use("/", tqualification);
app.use("/", skorkt1);
app.use("/", comparenilai);
app.use("/", tdays);
app.use("/", updatedays);
app.use("/", createqual);
app.use("/", hitungcluster);
app.use("/", createpool);
app.use("/", createqualalt);
app.use("/", createprofile);
app.use("/", getbelumlengkap);
app.use("/", getlengkap);

// Qualification
app.use("/", getqualification);
app.use("/", getquallolos)
app.use("/", getkkm)

// Pool
app.use("/", gettalentpool);
app.use("/", gettabledayskaryawan);

// Days
app.use("/", skordays);
app.use("/", detailnilai);
app.use("/", getalldays);
app.use("/", gettabledaysbpj)

// app.get("/*", (req,res)=>{
//     res.status(200).json({message: 'Welcome To ITMS Back-End'})
// })

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});