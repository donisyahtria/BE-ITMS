# BE-ITMS - GITHUB

# …or create a new repository on the command line <br>
echo "# BE-ITMS" >> README.md <br>
git init <br>
git add README.md <br>
git commit -m "first commit" <br>
git branch -M main <br>
git remote add origin https://github.com/donisyahtria/BE-ITMS.git <br>
git push -u origin main <br>

# …or push an existing repository from the command line <br>
git remote add origin https://github.com/donisyahtria/BE-ITMS.git <br>
git branch -M main <br>
git push -u origin main <br>

# atau ketika push edit <br>
git add . (ini untuk semua) <br>
git add <namafile> (untuk push salah satu saja) <br>
git commit -m "(jangan lupa kasih nama)" <br>
git branch -M main <br>
git push -u origin main <br>

# cara cloning <br>
klik button code --> pilih HTTPS --> copy url to clipboard <br>
buka terminal --> plih directory untuk menyimpan cloning --> ketik seperti dibawah<br>
git clone (paste link url nya tadi tanpa tanda kurung)

# BE-ITMS - GITLAB

# cara pertama kali push <br>
git remote add original https://gitlab.posindonesia.co.id/donisyahtria/itms-fe.git <br>
git branch -M main <br>
git push -uf original main <br>

# cara push <br>
git add . <br>
git commit -m "<disini nama commit>" <br>
git push original <br>