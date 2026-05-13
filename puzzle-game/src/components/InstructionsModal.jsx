import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const InstructionsModal = ({ isOpen, onClose }) => {
  const dialog = useRef(null);
  const instructionsTextRef = useRef(null);
  const [showJapanese, setShowJapanese] = useState(true);

  useEffect(() => {
    if (!dialog.current) return;

    if (isOpen && !dialog.current.open) {
      dialog.current.showModal();

      setTimeout(() => {
      if (instructionsTextRef.current) {
        instructionsTextRef.current.scrollTop = 0;
      }
    }, 0);
    } else if (!isOpen && dialog.current.open) {
      dialog.current.close();
    }
  }, [isOpen]);

  const toggleLanguage = () => {
    setShowJapanese((prev) => !prev);
  };

  return createPortal(
    <dialog ref={dialog} className="instructions-modal" onClose={onClose}>
      <motion.div
        className="instructions-content"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="instructions-header">
          <h2>{showJapanese ? "説明書" : "Instructions"}</h2>

          <button className="translate-btn" onClick={toggleLanguage}>
            {showJapanese ? "English" : "日本語"}
          </button>
        </div>

        <div className="instructions-text" ref={instructionsTextRef}>
          {showJapanese ? (
            <>
              <p>1. ホーム画面では、画像やパズルのボタンをタップすると、ゲーム画面に移動できます。</p>

              <p>2. パズル画面では、ピースをタップしてドラッグできます。正しいピース同士はくっつき、グループとして一緒に動きます。</p>

              <p>3. パズルが完成すると、「Congratulations!」が表示されます。完成した画面を写真に撮って、家族や友達に送ることもできます。</p>

              <p>4. パズルの周りにあるボタンで、ゲームの操作ができます。下の説明を読んでください。</p>

              <p>5. リスタートを使うと、今のパズルをもう一度シャッフルできます。</p>

              <p><b>ボタン:</b></p>

              <ul className="instructions-list">
                <li><span>English</span> / <span>日本語</span>: 画面の言語を変更します。</li>
                <li><span>Home</span> / <span>家</span>: ホーム画面に戻ります。</li>
                <li><span>Shuffle</span> / <span>シャッフル</span>: ランダムなパズルに変更します。</li>
                <li><span>Restart</span> / <span>リスタート</span>: 今のパズルをもう一度シャッフルします。</li>
                <li><span>Hint</span> / <span>ヒント</span>: 完成したパズルの画像を2秒間表示します。</li>
                <li><span>Instructions</span> / <span>説明書</span>: この説明画面をもう一度表示します。</li>
              </ul>

              <p>下の選択ボックスをタップすると、遊びたいパズルを変更できます。</p>
            </>
          ) : (
            <>
              <p>1. From the home screen, you can tap on the images or buttons of certain puzzles to be directed to the game platform.</p>

              <p>2. Once in the puzzle platform, you can tap and drag each piece to create clusters. Each cluster can be attached to other pieces and other clusters.</p>

              <p>3. Once the puzzle is complete, you will see “Congratulations!” You can take a picture of your completion and send it to a loved one before moving on to the next puzzle.</p>

              <p>4. Each button around the puzzle can change your puzzle experience, so please read the descriptions below.</p>

              <p>5. Use restart to shuffle the current puzzle again.</p>

              <p><b>Buttons:</b></p>

              <ul className="instructions-list">
                <li><span>English</span> or <span>日本語</span>: changes the language you see on the screen.</li>
                <li><span>Home</span> or <span>家</span>: takes you back to the home page.</li>
                <li><span>Shuffle</span> or <span>シャッフル</span>: gives you a random puzzle to work on.</li>
                <li><span>Restart</span> or <span>リスタート</span>: reshuffles your current puzzle.</li>
                <li><span>Hint</span> or <span>ヒント</span>: shows you what the completed puzzle looks like for 2 seconds.</li>
                <li><span>Instructions</span> or <span>説明書</span>: shows this pop-up again if you need help.</li>
              </ul>

              <p>Tapping the box at the bottom allows you to change the puzzle you want to play.</p>
            </>
          )}
        </div>
        <p className="instructions-scroll">{showJapanese ? "下にスクロール" : "Scroll down"}</p>

        <button className="instructions-close" onClick={onClose}>
          Close
        </button>
      </motion.div>
    </dialog>,
    document.getElementById("instructions")
  );
};

export default InstructionsModal;