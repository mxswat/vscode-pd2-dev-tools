get-content hashlist.txt | select-string -pattern '(^(?!lib).*)' -notmatch | Out-File -Encoding "UTF8" hashlist_clean.txt
