get-content hashlist.txt | select-string -pattern '(^(?!lib).*)' -notmatch | Out-File hashlist_clean.txt
