<?php foreach (($result?:array()) as $band): ?>
<?php echo $this->render('templates/bandBadge.html',$this->mime,get_defined_vars()); ?>
<?php endforeach; ?>
