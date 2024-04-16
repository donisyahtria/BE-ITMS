# BE-ITMS

# …or create a new repository on the command line
echo "# BE-ITMS" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/donisyahtria/BE-ITMS.git
git push -u origin main

# …or push an existing repository from the command line
git remote add origin https://github.com/donisyahtria/BE-ITMS.git
git branch -M main
git push -u origin main

# atau ketika push edit
git add . (ini untuk semua)
git add <namafile> (untuk push salah satu saja)
gitu commit -m "<kasih nama commit penanda push>"
git branch -M main
git push -u origin main