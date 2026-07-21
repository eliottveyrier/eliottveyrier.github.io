export const sceneThumbnailScript = `New-Item -ItemType Directory -Force {{thumbnails}} | Out-Null

ffmpeg -i {{input.mov}} -vf "select='gt(scene,{{0.40}})',showinfo" -an -f null NUL 2>&1 |
ForEach-Object {
    if ($_ -match "pts_time:([0-9.]+)") {
        $s = [double]$Matches[1]

        $tc = "{0:00}-{1:00}-{2:00}-{3:00}" -f
            [math]::Floor($s / 3600),
            [math]::Floor(($s % 3600) / 60),
            [math]::Floor($s % 60),
            [math]::Floor(($s % 1) * {{24}})

        ffmpeg -ss $s -i {{input.mov}} -frames:v 1 -q:v 2 "{{thumbnails}}\\$tc.jpg"
    }
}`;