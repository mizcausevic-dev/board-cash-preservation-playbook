$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Board Cash Preservation Playbook", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic scenario render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ScenarioImage -Title "Board-ready overview for cash preservation" -Subtitle "One executive brief for freezes, ring-fenced systems, deferred spend, downside containment, and annual cash impact." -Bullets @(
  "The overview keeps the strongest freeze, ring-fence, defer, and hold lanes visible in one committee-safe surface.",
  "Leadership can see where cash is preserved fastest and where proof quality still blocks a preservation ask.",
  "This layer turns scattered scorecards into one preservation packet instead of another manual synthesis cycle."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ScenarioImage -Title "Preservation brief keeps audience, spend category, and action connected" -Subtitle "Every route retains the owner, audience, action, spend category, preservation theme, and next move." -Bullets @(
  "The preservation-brief view makes it obvious which systems should be frozen, ring-fenced, deferred, or held next.",
  "Board questions stay attached to actual sources of cash preservation and continuity protection.",
  "Leadership can tighten the committee packet before the next board, investor, or downside review begins."
) -OutputPath (Join-Path $screenshots "02-preservation-brief-proof.png")

New-ScenarioImage -Title "Freeze candidates show which lanes can preserve cash cleanly" -Subtitle "Cash-burn relief, downside containment, fragility, and company-tag signals stay visible in one decision readout." -Bullets @(
  "This view keeps procurement, AI, and adjacent overlap traces tied to actual freeze and defer candidates.",
  "Weak preservation stories stay visible before the committee cuts into a lane that still protects the board narrative.",
  "Leadership can see which move will preserve cash fastest without creating hidden risk."
) -OutputPath (Join-Path $screenshots "03-freeze-candidates-proof.png")

New-ScenarioImage -Title "Downside sequencing keeps cash impact and urgency together" -Subtitle "Annual cash impact, continuity protection, board defensibility, and urgency stay grounded in the same sequence view." -Bullets @(
  "The executive story stays tied to actual downside sequencing instead of vague austerity language.",
  "Thin proof remains visible before it turns into another inconclusive board discussion.",
  "This creates a repeatable packet that can travel into diligence, investor, and operating reviews."
) -OutputPath (Join-Path $screenshots "04-downside-sequencing-proof.png")
