document.addEventListener('DOMContentLoaded', function () {
    console.log("admin.js loaded");
    textField = document.querySelector("#text_field");

    if (textField) {
        textField.classList.add("invisible");
        textField.setAttribute('style', 'overflow-y: visible! important');
        textField.setAttribute('style', 'height: 500px');
        htmlString = textField.value
        textParent = textField.parentElement;

        const editorText = document.createElement("div");
        editorText.classList.add("admin_input");
        editorText.setAttribute("contenteditable", "true");

        const saveButton = document.createElement("button");
        saveButton.classList.add("bold_button");
        saveButton.setAttribute("type", "button");
        saveButton.setAttribute("data-element", "italic");
        const saveInner = document.createElement("i");
        saveInner.classList.add("fa", "fa-save");
        saveButton.appendChild(saveInner);

        const undoButton = document.createElement("button");
        undoButton.classList.add("bold_button");
        undoButton.setAttribute("type", "button");
        undoButton.setAttribute("data-element", "undo");
        const undoInner = document.createElement("i");
        undoInner.classList.add("fa", "fa-undo");
        undoButton.appendChild(undoInner);

        const redoButton = document.createElement("button");
        redoButton.classList.add("bold_button");
        redoButton.setAttribute("type", "button");
        redoButton.setAttribute("data-element", "redo");
        const redoInner = document.createElement("i");
        redoInner.classList.add("fa", "fa-redo");
        redoButton.appendChild(redoInner);

        const sourceButton = document.createElement("button");
        sourceButton.classList.add("bold_button", "source_button");
        sourceButton.setAttribute("type", "button");
        sourceButton.innerHTML = "source";

        const boldButton = document.createElement("button");
        boldButton.classList.add("bold_button");
        boldButton.setAttribute("type", "button");
        boldButton.setAttribute("data-element", "bold");
        const boldInner = document.createElement("i");
        boldInner.classList.add("fa", "fa-bold");
        boldButton.appendChild(boldInner);

        const italicButton = document.createElement("button");
        italicButton.classList.add("bold_button");
        italicButton.setAttribute("type", "button");
        italicButton.setAttribute("data-element", "italic");
        const italicInner = document.createElement("i");
        italicInner.classList.add("fa", "fa-italic");
        italicButton.appendChild(italicInner);

        const underlineButton = document.createElement("button");
        underlineButton.classList.add("bold_button");
        underlineButton.setAttribute("type", "button");
        underlineButton.setAttribute("data-element", "underline");
        const underlineInner = document.createElement("i");
        underlineInner.classList.add("fa", "fa-underline");
        underlineButton.appendChild(underlineInner);


        const unorderedListButton = document.createElement("button");
        unorderedListButton.classList.add("bold_button");
        unorderedListButton.setAttribute("type", "button");
        unorderedListButton.setAttribute("data-element", "insertUnorderedList");
        const unorderedListInner = document.createElement("i");
        unorderedListInner.classList.add("fa", "fa-list-ul");
        unorderedListButton.appendChild(unorderedListInner);

        const orderedListButton = document.createElement("button");
        orderedListButton.classList.add("bold_button");
        orderedListButton.setAttribute("type", "button");
        orderedListButton.setAttribute("data-element", "insertOrderedList");
        const orderedListInner = document.createElement("i");
        orderedListInner.classList.add("fa", "fa-list-ol");
        orderedListButton.appendChild(orderedListInner);

        const createLink = document.createElement("button");
        createLink.classList.add("bold_button");
        createLink.setAttribute("type", "button");
        createLink.setAttribute("data-element", "createlink");
        const createLinkInner = document.createElement("i");
        createLinkInner.classList.add("fa", "fa-link");
        createLink.appendChild(createLinkInner);

        const justifyLeft = document.createElement("button");
        justifyLeft.classList.add("bold_button");
        justifyLeft.setAttribute("type", "button");
        justifyLeft.setAttribute("data-element", "justifyLeft");
        const justifyLeftInner = document.createElement("i");
        justifyLeftInner.classList.add("fa", "fa-align-left");
        justifyLeft.appendChild(justifyLeftInner);

        const justifyCenter = document.createElement("button");
        justifyCenter.classList.add("bold_button");
        justifyCenter.setAttribute("type", "button");
        justifyCenter.setAttribute("data-element", "justifyCenter");
        const justifyCenterInner = document.createElement("i");
        justifyCenterInner.classList.add("fa", "fa-align-center");
        justifyCenter.appendChild(justifyCenterInner);

        const justifyRight = document.createElement("button");
        justifyRight.classList.add("bold_button");
        justifyRight.setAttribute("type", "button");
        justifyRight.setAttribute("data-element", "justifyRight");
        const justifyRightInner = document.createElement("i");
        justifyRightInner.classList.add("fa", "fa-align-right");
        justifyRight.appendChild(justifyRightInner);

        const justifyFull = document.createElement("button");
        justifyFull.classList.add("bold_button");
        justifyFull.setAttribute("type", "button");
        justifyFull.setAttribute("data-element", "justifyFull");
        const justifyFullInner = document.createElement("i");
        justifyFullInner.classList.add("fa", "fa-align-justify");
        justifyFull.appendChild(justifyFullInner);


        const insertImage = document.createElement("button");
        insertImage.classList.add("bold_button");
        insertImage.setAttribute("type", "button");
        insertImage.setAttribute("data-element", "insertImage");
        const insertImageInner = document.createElement("i");
        insertImageInner.classList.add("fa", "fa-image");
        insertImage.appendChild(insertImageInner);

        const strikethroughButton = document.createElement("button");
        strikethroughButton.classList.add("bold_button");
        strikethroughButton.setAttribute("type", "button");
        strikethroughButton.setAttribute("data-element", "strikethrough");
        const strikethroughInner = document.createElement("i");
        strikethroughInner.classList.add("fa", "fa-strikethrough");
        strikethroughButton.appendChild(strikethroughInner);

        const subscriptButton = document.createElement("button");
        subscriptButton.classList.add("bold_button");
        subscriptButton.setAttribute("type", "button");
        subscriptButton.setAttribute("data-element", "subscript");
        const subscriptInner = document.createElement("i");
        subscriptInner.classList.add("fa", "fa-subscript");
        subscriptButton.appendChild(subscriptInner);

        const superscriptButton = document.createElement("button");
        superscriptButton.classList.add("bold_button");
        superscriptButton.setAttribute("type", "button");
        superscriptButton.setAttribute("data-element", "superscript");
        const superscriptInner = document.createElement("i");
        superscriptInner.classList.add("fa", "fa-superscript");
        superscriptButton.appendChild(superscriptInner);

        const enterButton = document.createElement("button");
        enterButton.classList.add("bold_button");
        enterButton.setAttribute("type", "button");
        enterButton.setAttribute("data-element", "insertLineBreak");
        // enterButton.innerHTML = "br";
        const enterInner = document.createElement("i");
        enterInner.classList.add("fa", "fa-level-down");
        enterButton.appendChild(enterInner);

        const fontColor = document.createElement("button");
        fontColor.classList.add("bold_button", "source_button");
        fontColor.setAttribute("data-element", "foreColor");
        const fontColorInput = document.createElement("input");
        fontColorInput.setAttribute("type", "color");
        fontColorInput.setAttribute("value", "#008080");
        fontColor.appendChild(fontColorInput);

        const highlightColor = document.createElement("button");
        highlightColor.classList.add("bold_button", "source_button");
        highlightColor.setAttribute("data-element", "backColor");
        const highlightColorInput = document.createElement("input");
        highlightColorInput.setAttribute("type", "color");
        highlightColorInput.setAttribute("value", "#ffff00");
        highlightColor.appendChild(highlightColorInput);

        const emoji = document.createElement("button");
        emoji.classList.add("bold_button");
        emoji.classList.add("relative");
        emoji.setAttribute("type", "button");
        emoji.setAttribute("data-element", "insertImage");
        const emojiInner = document.createElement("i");
        emojiInner.classList.add("fa", "fa-smile");
        emoji.appendChild(emojiInner);
        const emojiBox = document.createElement("div");
        emojiBox.classList.add("emoji_box");
        emojiBox.classList.add("invisible");
        emoji.appendChild(emojiBox);

        // Add emojis
        const emoji_01 = document.createElement("img");
        emoji_01.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f601.png");
        emoji_01.classList.add("emoji_link");
        emojiBox.appendChild(emoji_01)
        const emoji_02 = document.createElement("img");
        emoji_02.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f603.png");
        emoji_02.classList.add("emoji_link");
        emojiBox.appendChild(emoji_02)
        const emoji_03 = document.createElement("img");
        emoji_03.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f602.png");
        emoji_03.classList.add("emoji_link");
        emojiBox.appendChild(emoji_03)
        const emoji_04 = document.createElement("img");
        emoji_04.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f609.png");
        emoji_04.classList.add("emoji_link");
        emojiBox.appendChild(emoji_04)
        const emoji_05 = document.createElement("img");
        emoji_05.setAttribute("src", " https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f642.png");
        emoji_05.classList.add("emoji_link");
        emojiBox.appendChild(emoji_05)
        const emoji_06 = document.createElement("img");
        emoji_06.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f92a.png");
        emoji_06.classList.add("emoji_link");
        emojiBox.appendChild(emoji_06)
        const emoji_07 = document.createElement("img");
        emoji_07.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f64c.png");
        emoji_07.classList.add("emoji_link");
        emojiBox.appendChild(emoji_07)
        const emoji_08 = document.createElement("img");
        emoji_08.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f44f.png");
        emoji_08.classList.add("emoji_link");
        emojiBox.appendChild(emoji_08)
        const emoji_09 = document.createElement("img");
        emoji_09.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f64f.png");
        emoji_09.classList.add("emoji_link");
        emojiBox.appendChild(emoji_09)
        const emoji_10 = document.createElement("img");
        emoji_10.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f91d.png");
        emoji_10.classList.add("emoji_link");
        emojiBox.appendChild(emoji_10)
        const emoji_11 = document.createElement("img");
        emoji_11.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f44d.png");
        emoji_11.classList.add("emoji_link");
        emojiBox.appendChild(emoji_11)
        const emoji_12 = document.createElement("img");
        emoji_12.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f44e.png");
        emoji_12.classList.add("emoji_link");
        emojiBox.appendChild(emoji_12)
        const emoji_13 = document.createElement("img");
        emoji_13.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f91e.png");
        emoji_13.classList.add("emoji_link");
        emojiBox.appendChild(emoji_13)
        const emoji_14 = document.createElement("img");
        emoji_14.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f448.png");
        emoji_14.classList.add("emoji_link");
        emojiBox.appendChild(emoji_14)
        const emoji_15 = document.createElement("img");
        emoji_15.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f449.png");
        emoji_15.classList.add("emoji_link");
        emojiBox.appendChild(emoji_15)
        const emoji_16 = document.createElement("img");
        emoji_16.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f446.png");
        emoji_16.classList.add("emoji_link");
        emojiBox.appendChild(emoji_16)
        const emoji_17 = document.createElement("img");
        emoji_17.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f447.png");
        emoji_17.classList.add("emoji_link");
        emojiBox.appendChild(emoji_17)
        const emoji_18 = document.createElement("img");
        emoji_18.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/270b.png");
        emoji_18.classList.add("emoji_link");
        emojiBox.appendChild(emoji_18)
        const emoji_19 = document.createElement("img");
        emoji_19.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f44b.png");
        emoji_19.classList.add("emoji_link");
        emojiBox.appendChild(emoji_19)
        const emoji_20 = document.createElement("img");
        emoji_20.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f4aa.png");
        emoji_20.classList.add("emoji_link");
        emojiBox.appendChild(emoji_20)
        const emoji_21 = document.createElement("img");
        emoji_21.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f60e.png");
        emoji_21.classList.add("emoji_link");
        emojiBox.appendChild(emoji_21)
        const emoji_22 = document.createElement("img");
        emoji_22.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f913.png");
        emoji_22.classList.add("emoji_link");
        emojiBox.appendChild(emoji_22)
        const emoji_23 = document.createElement("img");
        emoji_23.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f917.png");
        emoji_23.classList.add("emoji_link");
        emojiBox.appendChild(emoji_23)
        const emoji_24 = document.createElement("img");
        emoji_24.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f61d.png");
        emoji_24.classList.add("emoji_link");
        emojiBox.appendChild(emoji_24)
        const emoji_25 = document.createElement("img");
        emoji_25.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f911.png");
        emoji_25.classList.add("emoji_link");
        emojiBox.appendChild(emoji_25)
        const emoji_26 = document.createElement("img");
        emoji_26.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f920.png");
        emoji_26.classList.add("emoji_link");
        emojiBox.appendChild(emoji_26)
        const emoji_27 = document.createElement("img");
        emoji_27.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f614.png");
        emoji_27.classList.add("emoji_link");
        emojiBox.appendChild(emoji_27)
        const emoji_28 = document.createElement("img");
        emoji_28.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f61f.png");
        emoji_28.classList.add("emoji_link");
        emojiBox.appendChild(emoji_28)
        const emoji_29 = document.createElement("img");
        emoji_29.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f9d0.png");
        emoji_29.classList.add("emoji_link");
        emojiBox.appendChild(emoji_29)
        const emoji_30 = document.createElement("img");
        emoji_30.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f629.png");
        emoji_30.classList.add("emoji_link");
        emojiBox.appendChild(emoji_30)
        const emoji_31 = document.createElement("img");
        emoji_31.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f624.png");
        emoji_31.classList.add("emoji_link");
        emojiBox.appendChild(emoji_31)
        const emoji_32 = document.createElement("img");
        emoji_32.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f92c.png");
        emoji_32.classList.add("emoji_link");
        emojiBox.appendChild(emoji_32)
        const emoji_33 = document.createElement("img");
        emoji_33.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f610.png");
        emoji_33.classList.add("emoji_link");
        emojiBox.appendChild(emoji_33)
        const emoji_34 = document.createElement("img");
        emoji_34.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f62f.png");
        emoji_34.classList.add("emoji_link");
        emojiBox.appendChild(emoji_34)
        const emoji_35 = document.createElement("img");
        emoji_35.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f632.png");
        emoji_35.classList.add("emoji_link");
        emojiBox.appendChild(emoji_35)
        const emoji_36 = document.createElement("img");
        emoji_36.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f635.png");
        emoji_36.classList.add("emoji_link");
        emojiBox.appendChild(emoji_36)
        const emoji_37 = document.createElement("img");
        emoji_37.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f92f.png");
        emoji_37.classList.add("emoji_link");
        emojiBox.appendChild(emoji_37)
        const emoji_38 = document.createElement("img");
        emoji_38.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f631.png");
        emoji_38.classList.add("emoji_link");
        emojiBox.appendChild(emoji_38)
        const emoji_39 = document.createElement("img");
        emoji_39.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f92e.png");
        emoji_39.classList.add("emoji_link");
        emojiBox.appendChild(emoji_39)
        const emoji_40 = document.createElement("img");
        emoji_40.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f922.png");
        emoji_40.classList.add("emoji_link");
        emojiBox.appendChild(emoji_40)
        const emoji_41 = document.createElement("img");
        emoji_41.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f912.png");
        emoji_41.classList.add("emoji_link");
        emojiBox.appendChild(emoji_41)
        const emoji_42 = document.createElement("img");
        emoji_42.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f915.png");
        emoji_42.classList.add("emoji_link");
        emojiBox.appendChild(emoji_42)
        const emoji_43 = document.createElement("img");
        emoji_43.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/1f3af.png");
        emoji_43.classList.add("emoji_link");
        emojiBox.appendChild(emoji_43)
        const emoji_44 = document.createElement("img");
        emoji_44.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/2705.png");
        emoji_44.classList.add("emoji_link");
        emojiBox.appendChild(emoji_44)
        const emoji_45 = document.createElement("img");
        emoji_45.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/26d4.png");
        emoji_45.classList.add("emoji_link");
        emojiBox.appendChild(emoji_45)
        const emoji_46 = document.createElement("img");
        emoji_46.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/274c.png");
        emoji_46.classList.add("emoji_link");
        emojiBox.appendChild(emoji_46)
        const emoji_47 = document.createElement("img");
        emoji_47.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/2757.png");
        emoji_47.classList.add("emoji_link");
        emojiBox.appendChild(emoji_47)
        const emoji_48 = document.createElement("img");
        emoji_48.setAttribute("src", "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/2753.png");
        emoji_48.classList.add("emoji_link");
        emojiBox.appendChild(emoji_48)
        // Emojis

        const editorToolsPanel = document.createElement("div");
        editorToolsPanel.classList.add("tool_panel");
        const toolPanelTop = document.createElement("div");
        const toolPanelBottom = document.createElement("div");
        toolPanelTop.classList.add("tool_panel_row");
        toolPanelBottom.classList.add("tool_panel_row");

        toolPanelTop.appendChild(saveButton);
        toolPanelTop.appendChild(sourceButton);
        toolPanelTop.appendChild(undoButton);
        toolPanelTop.appendChild(redoButton);
        toolPanelTop.appendChild(createLink);
        toolPanelTop.appendChild(insertImage);
        toolPanelTop.appendChild(fontColor);
        toolPanelTop.appendChild(highlightColor);
        toolPanelTop.appendChild(enterButton);

        toolPanelBottom.appendChild(boldButton);
        toolPanelBottom.appendChild(italicButton);
        toolPanelBottom.appendChild(underlineButton);
        // toolPanelBottom.appendChild(unorderedListButton);
        toolPanelBottom.appendChild(orderedListButton);
        toolPanelBottom.appendChild(justifyLeft);
        toolPanelBottom.appendChild(justifyCenter);
        toolPanelBottom.appendChild(justifyRight);
        toolPanelBottom.appendChild(justifyFull);
        toolPanelBottom.appendChild(strikethroughButton);
        toolPanelBottom.appendChild(subscriptButton);
        toolPanelBottom.appendChild(superscriptButton);
        toolPanelBottom.appendChild(emoji);

        editorText.innerHTML = htmlString;
        textParent.appendChild(editorToolsPanel);
        editorToolsPanel.appendChild(toolPanelTop);
        editorToolsPanel.appendChild(toolPanelBottom);
        textParent.appendChild(editorText);

        const simpleFuncs = [
            undoButton, redoButton, boldButton, italicButton, underlineButton,
            orderedListButton, justifyLeft, justifyCenter, justifyRight, justifyFull,
            strikethroughButton, subscriptButton, superscriptButton, enterButton
        ]
        simpleFuncs.forEach(button => {
            button.addEventListener('click', function () {
                let command = button.dataset['element'];
                // console.log("command", command);

                document.execCommand(command, false, null);
            });
        });

        insertImage.addEventListener('click', function () {
            let command = insertImage.dataset['element'];
            let url = prompt('Enter image link: ');
            // console.log("insertImage command", command, url);

            if (url) {
                document.execCommand(command, false, url);
            }
        });

        emoji.addEventListener('click', function () {
            emojiBox.classList.toggle("invisible");
        });

        createLink.addEventListener('click', function () {
            let command = createLink.dataset['element'];
            let url = prompt('Enter link: ');
            // console.log("createLink command", command, url);

            if (url) {
                document.execCommand(command, false, url);
            }
        });

        fontColor.addEventListener('change', function () {
            let command = fontColor.dataset['element'];
            let color = fontColor.querySelector("input").value;
            // console.log("command", command);
            // console.log("fontColor.value", color);

            document.execCommand(command, false, color);
        });

        highlightColor.addEventListener('change', function () {
            let command = highlightColor.dataset['element'];
            let color = highlightColor.querySelector("input").value;
            // console.log("command", command);
            // console.log("highlightColor.value", color);

            document.execCommand(command, false, color);
        });

        sourceButton.addEventListener('click', function () {
            textField.classList.toggle("invisible");
        });

        const smiles = document.querySelectorAll(".emoji_link");
        smiles.forEach(smile => {
            smile.addEventListener('click', () => {
                document.execCommand("insertImage", false, smile.src);
            });
        });

        // Change source code when type smth in editor panel
        saveButton.addEventListener('click', function () {
            // console.log("editorPanel.innerHTML", document.querySelector(".admin_input").innerHTML);
            textField.value = document.querySelector(".admin_input").innerHTML.replaceAll(/&lt;/g, "<").replaceAll(/&gt;/g, ">");
            document.querySelector("button[name='action-publish']").click();
        });
    }
});