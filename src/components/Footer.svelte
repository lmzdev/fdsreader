<script>
  import LogoGithub from "carbon-icons-svelte/lib/LogoGithub.svelte";
  import Link from "carbon-icons-svelte/lib/Link.svelte";

</script>


<div class="footer">
    <a class="f-item outline" href="/">Startseite</a>
    <a class="f-item outline" href="https://feueron.de/feueron"><Link style="margin-bottom:2px" size={16} /> FeuerON </a>
    <a
      class="f-item outline"
      href="https://www.nlbk.niedersachsen.de/download/108403/FeuerON_-_FDS-Schnittstellenbeschreibung.pdf"
    ><Link style="margin-bottom:2px" size={16} />
      FDS-Dokumentation
    </a>
    <a class="f-item outline" href="https://github.com/lmzdev/fdsreader"><LogoGithub style="margin-bottom:2px" size={16} /> GitHub </a>
  </div>

  <style>
 .footer {
    display: flex;
    max-width: 900px;
    margin: 20px auto;
    padding: 8px 0px;
    border-top: 1px solid var(--muted-color);
  }
  a.f-item {
    margin: auto;
    color: var(--muted-color);
  }

  </style>