import express from "express";
import bodyParser, { json } from "body-parser";
import cors from "cors";

import loginadmin from "./routes/login/login";
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
import createqual from "./routes/cluster/createtalentcluster"
import hitungcluster from "./routes/cluster/hitungcluster"
import createpool    from "./routes/Pool/createtalentpool"
import createqualalt from "./routes/qualification/createqual_alt"
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
import assignkomiteunibybutton from "./routes/usermanagement/assignkomiteunitbybutton"
import assignroleketuakomite from "./routes/usermanagement/assignroleketuakomite"
import getnotification from "./routes/notification/getnotification"
import updatestatusnotif from "./routes/notification/statusnotification"
import getinforkaryawan from "./routes/talentprofile/getinfokaryawan"
import updatepaktacommitpribadi from "./routes/talentprofile/updatepaktacommitpribadi"
import getallprofile from "./routes/talentprofile/getallprofile"
import getallroles   from "./routes/usermanagement/getallroles"
import updaterolemanagement from "./routes/usermanagement/updaterolemanagement"
import getnilaiassessment from "./routes/parameter/getnilaiassessment"
import uploadskorakhlak from "./routes/parameter/uploadskor"
import getquestion from "./routes/parameter/getquestion"
import addquestion from "./routes/parameter/createquestion"
import updatequestion from "./routes/parameter/updatequestion"
import geteventdeadline from "./routes/event/geteventdeadlines"
import updatestatuspool from "./routes/Pool/updatestatus"
import assignasbpj from "./routes/days/assignasbpj"
import getdatagender from "./routes/dashboard/genderdistribution"
import getgendistribution from "./routes/dashboard/gendistribution"
import getquestionevent from "./routes/days/getquestionevent"
import updatenilaibutton from "./routes/days/updatenilaibutton"
import getanggotakomitetalent from "./routes/parameter/getanggotakomitetalent"
import gettotaladdedmember from "./routes/parameter/gettotaladdedmember"
import assignaskomitetalent from "./routes/parameter/assignaskomitetalent"
import getpopulasi from "./routes/dashboard/presentasepopulasi"
import getnilaidays from "./routes/days/getallnilai"
import getketuanames from "./routes/parameter/getketuanames"
import createqualificationtable from "./routes/qualification/createqualification_new"
import notifketuakomite from "./routes/cluster/notifikasiketuakomite"
import notiftalent      from "./routes/Pool/notifikasitalentpool"
import getsijabinfo     from "./routes/days/getsijabinfo"
import gantipassword from './routes/login/gantipassword'
import getprofile from './routes/userprofile/getprofile'
import loginsso from './routes/login/loginsso'
import updatenki from './routes/login/updateskornki'

const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Login
app.use("/", loginadmin);
app.use("/", getkaryawan);
app.use("/", getrole);
app.use("/", gantipassword)
app.use("/", loginsso)
app.use("/", updatenki)

// Dashboard
app.use("/", getdatatalentrumpun)
app.use("/", getdatatalentjoblevel)
app.use("/", getdetailtalent)
app.use("/", getdatagender)
app.use("/", getgendistribution)
app.use("/", getpopulasi)

//general
app.use("/", updatedeadline)
app.use("/", getnotification)
app.use("/", updatestatusnotif)
app.use("/", geteventdeadline)
app.use("/", getprofile)

//usermanagement
app.use("/", assignkaryawan)
app.use("/", assignkomiteunit)
app.use("/", assignkomiteunibybutton)
app.use("/", assignroleketuakomite)
app.use("/", getallroles)
app.use("/", updaterolemanagement)

//Parameter
app.use("/", qualparameter)
app.use("/", updateparameterqual)
app.use("/", getparameterkuota)
app.use("/", updatekuota)
app.use("/", getnilaiassessment)
app.use("/", uploadskorakhlak)
app.use("/", getquestion)
app.use("/", addquestion)
app.use("/", updatequestion)
app.use("/", getanggotakomitetalent)
app.use("/", gettotaladdedmember)
app.use("/", assignaskomitetalent)
app.use("/", getketuanames)

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
app.use("/", getinforkaryawan)
app.use("/", updatepaktacommitpribadi)
app.use("/", getallprofile)

// Qualification
app.use("/", getqualification);
app.use("/", getquallolos)
app.use("/", getkkm)
app.use("/", createqualificationtable)

//Cluster
app.use("/", clustertable)
app.use("/", getkomitetalentevent)
app.use("/", updatematriks)
app.use("/", notifketuakomite)

// Pool
app.use("/", gettalentpool);
app.use("/", gettabledayskaryawan);
app.use("/", selesaistatus)
app.use("/", updatestatuspool)
app.use("/", notiftalent)

// Days
app.use("/", detailnilai);
app.use("/", getalldays);
app.use("/", gettabledaysbpj)
app.use("/", posttablebpj)
app.use("/", hapusbpj)
app.use("/", notifbpj)
app.use("/", loloskandays)
app.use("/", assignasbpj)
app.use("/", getquestionevent)
app.use("/", updatenilaibutton)
app.use("/", getnilaidays)
app.use("/", getsijabinfo)

app.get("/*", (req,res)=>{
    res.status(200).json({message: 'Welcome To ITMS Back-End'})
})

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});