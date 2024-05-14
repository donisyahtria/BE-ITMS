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
import clustertable from "./routes/cluster/clustertable"
import posttablebpj from "./routes/days/posttablebpj"
import hapusbpj from "./routes/days/hapusbpj"
import updateevent from "./routes/event/updateevent"
import selesaistatus from "./routes/Pool/selesaistatusevent"
import notifkomiteunit from "./routes/kts/komiteunitnotif"
import getkomiteunitevent from "./routes/event/getkomiteunitevent"
import notifkaryawan from "./routes/talentprofile/notifikasikaryawan"
import getkaryawanevent from "./routes/talentprofile/getkaryawanevent"
import getkomitetalentevent from "./routes/cluster/komitetalentevent"
import getrole from "./routes/login/getrole"
import loloskanprofile      from "./routes/talentprofile/loloskanprofile"
import notifbpj             from "./routes/days/notifikasibpj"
import loloskandays         from "./routes/days/loloskandays"
import updatematriks        from "./routes/cluster/updatematriks"
import qualparameter        from "./routes/parameter/qualparameter"
import updateparameterqual  from "./routes/parameter/updateparameterqual"
import getparameterkuota    from "./routes/parameter/getcurrentkuota"
import updatekuota          from "./routes/parameter/updateparameterkuota"
import getkomiteunitcandidate from "./routes/kts/getkomiteunitcandidate"
import updatekomiteunit     from "./routes/kts/updatekomiteunit"
import getdatatalentrumpun from  "./routes/dashboard/talentrumpun"
import getdatatalentjoblevel from "./routes/dashboard/talentjoblevel"
import getdetailtalent from "./routes/dashboard/detailtalent"
import assignkaryawan from "./routes/usermanagement/assignkaryawan"
import assignkomiteunit from "./routes/usermanagement/assignkomiteunit"

const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Login
app.use("/", loginadmin);
app.use("/", getkaryawan);
app.use("/", getrole);

// Dashboard
app.use("/", getdatatalentrumpun)
app.use("/", getdatatalentjoblevel)
app.use("/", getdetailtalent)

//general
app.use("/", updatedeadline)

//usermanagement
app.use("/", assignkaryawan)
app.use("/", assignkomiteunit)

//Parameter
app.use("/", qualparameter)
app.use("/", updateparameterqual)
app.use("/", getparameterkuota)
app.use("/", updatekuota)

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
app.use("/", updateevent)
app.use("/", getkomiteunitevent)

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
app.use("/", notifkomiteunit)
app.use("/", filterkaryawan);
app.use("/", getkomiteunit);
app.use("/", updatebool);
app.use("/", talentprofile);
app.use("/", carikomiteotomatis);
app.use("/", joblevelfilter);
app.use("/", getkomiteunitcandidate);
app.use("/", updatekomiteunit)

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
app.use("/", notifkaryawan)
app.use("/", getkaryawanevent)
app.use("/", loloskanprofile)

// Qualification
app.use("/", getqualification);
app.use("/", getquallolos)
app.use("/", getkkm)

//Cluster
app.use("/", clustertable)
app.use("/", getkomitetalentevent)
app.use("/", updatematriks)

// Pool
app.use("/", gettalentpool);
app.use("/", gettabledayskaryawan);
app.use("/",selesaistatus)

// Days
app.use("/", skordays);
app.use("/", detailnilai);
app.use("/", getalldays);
app.use("/", gettabledaysbpj)
app.use("/", posttablebpj)
app.use("/", hapusbpj)
app.use("/", notifbpj)
app.use("/", loloskandays)

// app.get("/*", (req,res)=>{
//     res.status(200).json({message: 'Welcome To ITMS Back-End'})
// })

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});